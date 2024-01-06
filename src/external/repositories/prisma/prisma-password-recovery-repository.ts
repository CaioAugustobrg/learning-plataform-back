import { type PasswordRecovery } from '../../../entities/password-recovery'
import { type User } from '../../../entities/user'
import { type PasswordRecoveryRepository } from '../../../usecases/ports/password-recovery-repository'
import { PrismaHelper } from './helpers/prisma-helper'

export class PrismaPasswordRecoveryRepository implements PasswordRecoveryRepository {
  async create (passwordRecovery: PasswordRecovery): Promise<PasswordRecovery> {
    return (PrismaHelper?.passwordRecovery.create({
      data: {
        token: passwordRecovery.token,
        userId: passwordRecovery.userId,
        expiration: passwordRecovery.expiration
      }
    })) as unknown as PasswordRecovery
  }

  async findUserByEmail (email: string): Promise<User | null> {
    return (PrismaHelper?.user.findUnique({
      where: { email }
    })) as unknown as User | null
  }

  async findToken (userToken: string): Promise<PasswordRecovery | null> {
    return (PrismaHelper?.passwordRecovery.findFirst({
      where: { token: userToken },
      orderBy: { expiration: 'desc' }
    })) as unknown as PasswordRecovery | null
  }

  async updatePassword (
    passwordTrim: string,
    userId: string
  ): Promise<User | null> {
    return (await PrismaHelper.user.update({
      where: { id: userId },
      data: { password: passwordTrim }
    })) as User | null
  }

  async findUserById (userId: string): Promise<User | null> {
    return (await PrismaHelper.user.findUnique({
      where: { id: userId }
    })) as User | null
  }
}
