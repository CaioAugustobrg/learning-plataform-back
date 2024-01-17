/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type UserRepository } from '../../ports/user-repository'
import { type User } from '../../../entities/user'

export class InMemoryUserRepository implements UserRepository {
  users: User[] = []
  constructor (users: User[]) {
    this.users = users
  }

  async findUserByCpf (cpf: string): Promise<User | null> {
    let user: User
    for (user of this?.users) {
      if (user.cpf === cpf) {
        return user
      }
    }
    return null
  }

  async findUserByEmail (email: string): Promise<User | null> {
    let user: User
    for (user of this.users) {
      if (user.email === email) {
        return user
      }
    }
    return null
  }

  async findUserById (userProfesorId: string): Promise<User | null> {
    let user: User
    for (user of this.users) {
      if (user.id === userProfesorId) {
        return user
      }
    }
    return null
  }

  async create (user: User): Promise<User | null> {
    const existsByCpf = await this.findUserByCpf(user.cpf)
    const existsByEmail = await this.findUserByEmail(user.email)
    if (!existsByCpf && !existsByEmail) {
      this.users.push(user)
      return user
    } else {
      return null
    }
  }

  async findUserByPhone (phone: string): Promise<User | null> {
    let user: User
    for (user of this.users) {
      if (user.phone === phone) {
        return user
      }
    }
    return null
  }

  async findUserByRegisterDocument (registerDocument: string): Promise<User | null> {
    let user: User
    for (user of this.users) {
      if (user.userRegisterDocument === registerDocument) {
        return user
      }
    }
    return null
  }

  async login (email: string, password: string): Promise<User | null> {
    let user: User
    for (user of this.users) {
      if (user.password === password && user.email === email) {
        return user
      }
    }
    return null
  }

  async deleteUser (userId: string): Promise<void> {
    await this.findUserById(userId)
    this.users.filter((user) => userId !== user.id)
  }
}
