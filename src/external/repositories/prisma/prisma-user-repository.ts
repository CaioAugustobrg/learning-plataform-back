import { type UserRepository } from '../../../usecases/ports/user-repository'
import { User } from '../../../entities/user'
import { PrismaHelper } from '../prisma/helpers/prisma-helper'
import bcrypt from 'bcrypt'

export class PrismaUserRepository implements UserRepository {
  async findUserByCpf (cpf: string): Promise<User | null> {
    return (PrismaHelper?.user?.findUnique({
      where: { cpf }
    })) as User | null
  }

  async findUserByEmail (email: string): Promise<User | null> {
    return (PrismaHelper?.user?.findUnique({
      where: { email }
    })) as User | null
  }

  async findUserByPhone (phone: string): Promise<User | null> {
    return (PrismaHelper?.user?.findUnique({
      where: { phone }
    })) as User | null
  }

  async create (user: User, roleName: string): Promise<string | null> {
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
        speciality: createUser.speciality

      }
    })

    const findRole = await PrismaHelper?.role?.findFirst({
      where: { name: roleName }
    })
    // eslint-disable-next-line no-extra-boolean-cast
    if (!(Boolean(findRole))) {
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
      return 'Usuário criado com sucesso'
    }
    return null
  }
}
// }
