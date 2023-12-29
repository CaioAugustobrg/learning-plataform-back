/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Request, type Response } from 'express'
import { type HttpRequest } from './ports/http'
import { type UserLoginUseCase } from '../usecases/user-login/user-login'
import jwt from 'jsonwebtoken'

export class UserLoginController {
  constructor (private readonly userLoginService: UserLoginUseCase) {}
  async handle (request: Request, response: Response): Promise<Response> {
    try {
      const httpRequest: HttpRequest = {
        body: request.body
      }
      const { email, password } = httpRequest.body

      if (!email || !password) {
        return response.status(400).json({
          msg: 'Email e senha são campos obrigatórios'
        })
      }
      const user = await this.userLoginService.handle(email, password)
      if (user) {
        const userId = user?.id
        const token = jwt.sign({ userId }, process.env.TOKEN_SECRET!, {
          expiresIn: '7d'
        })
        request.session.user = {
          id: userId,
          jwt: token,
          role: user.userRole

        }
      }

      const { password: userPassword, ...userWithoutPassword } = user ?? {}

      return response.status(200).json(userWithoutPassword)
    } catch (error: any) {
      return response.status(error.code || 500).json(error.message)
    }
  }
}
