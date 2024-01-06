import { type User } from '../../../entities/user'
import { InMemoryUserRepository } from './in-memory-user-repository'

describe('In memory user repository', () => {
  const users: User[] = [
    {
      name: 'Nome do Usuário',
      email: 'usuario@email.com',
      birthDate: new Date(),
      phone: '123456789',
      cpf: '12345678900',
      password: 'senha123',
      userRegisterDocument: 'documento123',
      speciality: 'especialidade',
      education: 'educação',
      updateAt: new Date(),
      id: '1',
      createdAt: new Date(),
      systemRole: 'CREATED',
      userRole: 'student'
    }
  ]

  let userRepo: InMemoryUserRepository
  beforeEach(() => {
    userRepo = new InMemoryUserRepository(users)
  })

  it('should call a method when finding an user by email', async () => {
    const spy = jest.spyOn(userRepo, 'findUserByEmail')
    const user = await userRepo.findUserByEmail('usuario@email.com')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('usuario@email.com')
    expect(user?.name).toEqual('Nome do Usuário')
    expect(user).not.toBeNull()
  })

  it('should return null if user is not found by email', async () => {
    const spy = jest.spyOn(userRepo, 'findUserByEmail')
    const user = await userRepo.findUserByEmail('asdasdasd@oioi.com')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('asdasdasd@oioi.com')
    expect(user?.name).toEqual(undefined)
    expect(user).toBeNull()
  })

  it('should call a method when finding a user by cpf', async () => {
    const spy = jest.spyOn(userRepo, 'findUserByCpf')
    const user = await userRepo.findUserByCpf('12345678900')
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith('12345678900')
    expect(user?.name).toEqual('Nome do Usuário')
    expect(user).not.toBeNull()
  })

  it('should return null if user is not found by cpf', async () => {
    const spy = jest.spyOn(userRepo, 'findUserByCpf')
    const user = await userRepo.findUserByCpf('123455546564')
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith('123455546564')
    expect(user?.name).toEqual(undefined)
    expect(user).toBeNull()
  })

  it('should call a method when finding a user by phone', async () => {
    const spy = jest.spyOn(userRepo, 'findUserByPhone')
    const user = await userRepo.findUserByPhone('123456789')
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith('123456789')
    expect(user?.name).toEqual('Nome do Usuário')
    expect(user).not.toBeNull()
  })

  it('should return null if user is not found by phone', async () => {
    const spy = jest.spyOn(userRepo, 'findUserByPhone')
    const user = await userRepo.findUserByPhone('987654321')
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith('987654321')
    expect(user?.name).toEqual(undefined)
    expect(user).toBeNull()
  })

  it('should call a method when finding a user by userRegisterDocument', async () => {
    const spy = jest.spyOn(userRepo, 'findUserByRegisterDocument')
    const user = await userRepo.findUserByRegisterDocument('documento123')
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith('documento123')
    expect(user?.name).toEqual('Nome do Usuário')
    expect(user).not.toBeNull()
  })

  it('should return null if user is not found by userRegisterDocument', async () => {
    const spy = jest.spyOn(userRepo, 'findUserByRegisterDocument')
    const user = await userRepo.findUserByRegisterDocument('documento999')
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith('documento999')
    expect(user?.name).toEqual(undefined)
    expect(user).toBeNull()
  })

  it('should do a login if user is found by email and password', async () => {
    const spy = jest.spyOn(userRepo, 'login')
    const user = await userRepo.login('usuario@email.com', 'senha123')
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith('usuario@email.com', 'senha123')
    expect(user?.name).toEqual('Nome do Usuário')
    expect(user).not.toBeNull()
  })

  it('should NOT do a login if user is found by email and password', async () => {
    const spy = jest.spyOn(userRepo, 'login')
    const user = await userRepo.login('oioisuario@email.com', 'senha999')
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith('oioisuario@email.com', 'senha999')
    expect(user?.name).toEqual(undefined)
    expect(user).toBeNull()
  })
}

)
