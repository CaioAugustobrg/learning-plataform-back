/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type PrismaUserRepository } from '../../../external/repositories/prisma/prisma-user-repository'
import ApiError from '../../../utils/apiError'

export class DeleteUserUseCase {
  constructor (
    private readonly prismaUserRepository: PrismaUserRepository
  ) {}

  async handle (
    userId: string
  ): Promise<void> {
    try {
      const userExists = await this.prismaUserRepository.findUserById(userId)
      if (!userExists) {
        throw new ApiError({
          code: 404,
          message: 'Usuário não encontrado'
        })
      } else {
        await this.prismaUserRepository.deleteUser(userId)
      }
    } catch (error: any) {
      throw new ApiError({
        code: error.code,
        message: error.message
      })
    }
  }
}
