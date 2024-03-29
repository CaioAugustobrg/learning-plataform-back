/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import ApiError from '../../../utils/apiError'
import { type User } from '../../../entities/user'
import { type PrismaUserRepository } from '../../../external/repositories/prisma/prisma-user-repository'
import bcrypt from 'bcrypt'

export class UserLoginUseCase {
  constructor (
    private readonly prismaUserLogin: PrismaUserRepository
  ) {}

  async handle (
    email: string,
    password: string
  ): Promise<User | null> {
    const findUserByEmail =
      await this.prismaUserLogin.findUserByEmail(email)

    if (!findUserByEmail) {
      throw new ApiError({
        code: 404,
        message: 'Email ou senha incorreto(s)'
      })
    }

    if (findUserByEmail.password) {
      const passwordMatch = await bcrypt.compare(
        password,
        findUserByEmail.password
      )

      if (!passwordMatch) {
        throw new ApiError({
          code: 404,
          message: 'Email ou senha incorreto(s)'
        })
      }
      console.log(findUserByEmail)
      return findUserByEmail
    } else {
      return findUserByEmail
    }
  }
}
