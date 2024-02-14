import { type PasswordRecovery } from '../../entities/password-recovery'
import { type User } from '../../entities/user'

export interface PasswordRecoveryRepository {
  create?: (passwordRecovery: PasswordRecovery) => Promise<PasswordRecovery>
  findUserByEmail?: (email: string) => Promise<User | null>
  findToken?: (userToken: string) => Promise<PasswordRecovery | null>
  updatePassword?: (
    userId: string,
    passwordTrim: string
  ) => Promise<User | null>
  findUserById?: (userId: string) => Promise<User | null>
}
