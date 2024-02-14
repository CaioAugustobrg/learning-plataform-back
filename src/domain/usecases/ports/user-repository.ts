import { type User } from '../../entities/user'

export interface UserRepository {
  // findUserByCpf: (cpf: string) => Promise<User | null>
  create: (user: User, roleName: string) => Promise<User | null>
  findUserByEmail: (email: string) => Promise<User | null>
  findUserById: (userProfesorId: string) => Promise<User | null>
  login: (email: string, password: string) => Promise<User | null>
  findUserByPhone: (phone: string) => Promise<User | null>
  findUserByRegisterDocument: (registerDocument: string) => Promise<User | null>
  deleteUser: (userId: string) => Promise<void>
}
