/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type Request, type Response } from 'express'
import { type CreateUserUseCase } from '../usecases/user/create-user/create-user'
import { type UserLoginUseCase } from '../usecases/user/user-login/user-login'
import { type HttpRequest } from './ports/http'
import jwt from 'jsonwebtoken'
import { type TryRecoveryPasswordUseCase } from '../usecases/user/try-recover-password/try-recover-password'
import { type PasswordRecoveryUseCase } from '../usecases/user/password-recovery/password-recovery'
import { type DeleteUserUseCase } from '../usecases/user/delete-user/delete-user'
import ApiError from '../utils/apiError'
import axios from 'axios'
import { type UserProps } from '../entities/user'
// import fetch from 'node-fetch'

export class UserController {
  constructor (
    private readonly createUserStudentUseCase: CreateUserUseCase,
    private readonly userLoginService: UserLoginUseCase,
    private readonly forgotPasswordUseCase: PasswordRecoveryUseCase,
    private readonly tryRecoveryPasswordUseCase: TryRecoveryPasswordUseCase,
    private readonly deleteUserById: DeleteUserUseCase
  ) {}

  async createUser (
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
      password
    } = httpRequest.body
    const roleName = httpRequest.params.roleName
    if (roleName === 'student') {
      try {
        if (!name || !email || !birthDate || !phone || !password) {
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
        if (!name || !email || !birthDate || !phone || !password) {
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

  async userLogin (request: Request, response: Response): Promise<Response> {
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
      if (user && request.session) {
        request.session.user = {}
        const userId = user?.id
        const token = jwt.sign({ userId }, process.env.TOKEN_SECRET!, {
          expiresIn: '7d'
        })
        request.session.user = {
          id: userId,
          jwt: token
        }
        request.session.save()
      }

      const { password: userPassword, ...userWithoutPassword } = user ?? {}

      return response.status(200).json(userWithoutPassword)
    } catch (error: any) {
      return response.status(error.code || 500).json(error.message)
    }
  }

  async passwordRecovery (request: Request, response: Response): Promise<Response> {
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

  async deleteUser (request: Request, response: Response) {
    const { userId } = request.body
    try {
      await this.deleteUserById.handle(userId)
    } catch (error: any) {
      return response.status(error.code || 500).json(error.message)
    }
  }

  async userGithubLogin (request: Request, response: Response) {
    const httpRequest = {
      body: request.body,
      params: request.params
    }
    const {
      client_id,
      client_secret,
      code
    } = httpRequest.body
    const roleName = httpRequest.params.roleName
    console.log(roleName)
    console.log(httpRequest.body)

    await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id,
        client_secret,
        code
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    )
      .then((result) => {
        void axios.get('https://api.github.com/user', {
          headers: {
            Authorization: `Bearer ${result.data.access_token}`
          }
        }).then((result) => {
          console.log(result.data)
          const data: UserProps = {
            name: result.data.name,
            email: result.data.email,
            githubId: result.data.id,
            userRole: roleName,
            phone: undefined,
            birthDate: undefined,
            password: undefined,
            systemRole: 'CREATED'
          }
          const httpResponse = this.createUserStudentUseCase.handle(
            data, roleName
          )
          return response.status(201).json(httpResponse)
        }
        )
      }).catch((err: any) => {
        if (err.response) {
          console.error('GitHub API responded with an error:', err.response.data)
        } else if (err.request) {
          console.error('No response received from GitHub API:', err.request)
        } else {
          console.error('Error setting up the GitHub API request:', err.message)
        }
        throw new ApiError({
          code,
          error: err
        })
      })
  }
}
