/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type Request, type Response } from 'express'
import { type CreateUserUseCase } from '../usecases/create-user/create-user'

export class CreateUserController {
  constructor (
    private readonly createUserStudentUseCase: CreateUserUseCase
  ) {}

  async handle (
    request: Request,
    response: Response
  ) {
    const httpRequest = {
      body: request.body,
      params: request.params
    }
    const {
      name,
      email,
      birthDate,
      phone,
      cpf,
      password,
      education,
      userRegisterDocument,
      speciality
    } = httpRequest.body
    const roleName = httpRequest.params.roleName
    if (roleName === 'student') {
      try {
        if (!name || !email || !birthDate || !phone || !password || !cpf) {
          return response.status(400).json({
            msg: 'Todos os campos são obrigatórios'
          })
        }
        const httpResponse = await this.createUserStudentUseCase.handle(
          httpRequest.body, roleName
        )
        return response.status(201).json(httpResponse)
      } catch (error: any) {
        return response.status(error.code || 500).json(error.message)
      }
    } else {
      try {
        if (!name || !email || !birthDate || !phone || !password || !cpf || !userRegisterDocument || !speciality || !education) {
          return response.status(400).json({
            msg: 'Todos os campos são obrigatórios'
          })
        }
        const httpResponse = await this.createUserStudentUseCase.handle(
          httpRequest.body,
          roleName
        )
        return response.status(201).json(httpResponse)
      } catch (error: any) {
        return response.status(error.code || 500).json(error.message)
      }
    }
  }
}
