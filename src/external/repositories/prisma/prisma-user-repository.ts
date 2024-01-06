/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type UserRepository } from '../../../usecases/ports/user-repository'
import { User } from '../../../entities/user'
import { PrismaHelper } from '../prisma/helpers/prisma-helper'
import bcrypt from 'bcrypt'

export class PrismaUserRepository implements UserRepository {
  async findUserByRegisterDocument (registerDocument?: string): Promise<User | null> {
    return (PrismaHelper?.user.findUnique({
      where: { userRegisterDocument: registerDocument }
    })) as unknown as User | null
  }

  async login (email: string, password: string): Promise<User | null> {
    const user = await PrismaHelper?.user.findUnique({
      where: { email }
    })
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password)
      if (isMatch) {
        return user as User
      }
    }
    return null
  }

  async findUserByCpf (cpf: string): Promise<User | null> {
    return (PrismaHelper?.user?.findUnique({
      where: { cpf }
    })) as unknown as User | null
  }

  async findUserByEmail (email: string): Promise<User | null> {
    return (PrismaHelper?.user?.findUnique({
      where: { email }
    })) as unknown as User | null
  }

  async findUserByPhone (phone: string): Promise<User | null> {
    return (PrismaHelper?.user?.findUnique({
      where: { phone }
    })) as unknown as User | null
  }

  async findUserById (userProfesorId: string): Promise<User | null> {
    return (PrismaHelper?.user?.findUnique({
      where: { id: userProfesorId }
    })) as unknown as User | null
  }

  async create (user: User, roleName: string): Promise<User | null> {
    const createUser = new User(user)
    const userPasswordHash = await bcrypt.hash(createUser.password, 8)

    const teste = await PrismaHelper.user.create({
      data: {
        id: createUser.id,
        cpf: createUser.cpf,
        name: createUser.name,
        email: createUser.email,
        phone: createUser.phone,
        password: userPasswordHash,
        birthDate: createUser.birthDate,
        speciality: createUser.speciality,
        createdAt: createUser.createdAt

      }
    })

    const findRole = await PrismaHelper?.role?.findFirst({
      where: { name: roleName }
    })
    // eslint-disable-next-line no-extra-boolean-cast
    if (!findRole) {
      return null
    }

    const createRole = await PrismaHelper?.userRole?.create({
      data: {
        roleId: findRole?.id,
        userId: teste?.id
      }
    })
    // eslint-disable-next-line no-extra-boolean-cast
    if (Boolean(createRole)) {
      return createUser
    }
    return null
  }
}
// }
