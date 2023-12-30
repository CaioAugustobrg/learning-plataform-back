import { PrismaUserRepository } from '../../external/repositories/prisma/prisma-user-repository'
import { UserLoginController } from '../../controllers/user-login'
import { UserLoginUseCase } from '../../usecases/user-login/user-login'

const prismaUserRepository = new PrismaUserRepository()
const userLoginUseCase = new UserLoginUseCase(prismaUserRepository)
const userLoginController = new UserLoginController(userLoginUseCase)
export { userLoginController }
