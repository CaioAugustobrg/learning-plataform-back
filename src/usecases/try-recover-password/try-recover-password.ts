/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import ApiError from '../../utils/apiError'
import { type User } from '../../entities/user'
import { type PrismaPasswordRecoveryRepository } from '../../external/repositories/prisma/prisma-password-recovery-repository'
import bcrypt from 'bcrypt'

export class TryRecoveryPasswordUseCase {
  constructor (
    private readonly prismaRecoveryPasswordRepository: PrismaPasswordRecoveryRepository
  ) {}

  async handle (
    httpRequest: {
      passwordTrim: string
      reWritepasswordTrim: string
      userToken: string
    }
  ): Promise<User | null> {
    const findToken = await this.prismaRecoveryPasswordRepository.findToken(
      httpRequest.userToken
    )

    if (!findToken) {
      throw new ApiError({
        code: 404,
        message: 'Token de usuário não encontrado'
      })
    }
    if (httpRequest.passwordTrim !== httpRequest.reWritepasswordTrim) {
      throw new ApiError({
        code: 404,
        message: 'Os campos devem ser iguais'
      })
    }
    const currentDateMillis = new Date().getTime()
    const expirationDateMillis = findToken.expiration.getTime()
    if (expirationDateMillis <= currentDateMillis) {
      throw new ApiError({
        code: 400,
        message:
          'O link, por razões de segurança, expirou. Refaça o procedimento'
      })
    }
    const userId = findToken.userId
    const findUserById =
      await this.prismaRecoveryPasswordRepository.findUserById(userId)
    if (!findUserById) {
      throw new ApiError({
        code: 404,
        message: 'Usuário não encontrado'
      })
    }
    const passwordMatch = await bcrypt.compare(
      httpRequest.passwordTrim,
      findUserById.password
    )
    if (passwordMatch) {
      throw new ApiError({
        code: 404,
        message: 'A nova senha não pode ser igual a senha atual'
      })
    }
    const userPasswordHash = await bcrypt.hash(httpRequest.passwordTrim, 8)
    const updateUserPasswordById =
      await this.prismaRecoveryPasswordRepository.updatePassword(
        userPasswordHash,
        userId
      )
    return updateUserPasswordById
  }
}
