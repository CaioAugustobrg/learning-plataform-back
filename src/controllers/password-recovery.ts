/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Request, type Response } from 'express'
import { type PasswordRecoveryUseCase } from '../usecases/password-recovery/password-recovery'
import { type HttpRequest } from './ports/http'
import { type TryRecoveryPasswordUseCase } from '../usecases/try-recover-password/try-recover-password'

export class PasswordRecoveryController {
  constructor (private readonly forgotPasswordUseCase: PasswordRecoveryUseCase,
    private readonly tryRecoveryPasswordUseCase: TryRecoveryPasswordUseCase) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const httpRequest: HttpRequest = {
      body: request.body
    }
    const { email, passwordTrim, reWritepasswordTrim, userToken } = httpRequest.body
    try {
      if (!userToken) {
        if (!email) {
          return response.status(400).json({
            msg: 'Email é um campo obrigatório'
          })
        }
        const forgotPassword = await this.forgotPasswordUseCase.handle(
          email
        )
        console.log(httpRequest)
        return response.status(200).json(forgotPassword)
      } else {
        if (!passwordTrim || !reWritepasswordTrim) {
          return response.status(400).json({
            msg: 'Senha é um campo obrigatório'
          })
        }

        await this.tryRecoveryPasswordUseCase.handle(
          httpRequest.body
        )
        return response.status(200).send('Senha alterada com sucesso!')
      }
    } catch (error: any) {
      return response.status(error.code || 500).json(error.message)
    }
  }
}
