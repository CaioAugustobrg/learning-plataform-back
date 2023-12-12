import { type User } from '../../entities/user'

export interface UserRepository {
  findUserByCpf: (cpf: string) => Promise<User | null>
  create: (user: User, roleName: string) => Promise<string | null>
  findUserByEmail: (email: string) => Promise<User | null>
  findUserByPhone: (phone: string) => Promise<User | null>
}
