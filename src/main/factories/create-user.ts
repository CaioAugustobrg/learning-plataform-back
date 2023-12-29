import { CreateUserController } from '../../controllers/create-user'
import { CreateUserUseCase } from '../../usecases/create-user/create-user'
import { PrismaUserRepository } from '../../external/repositories/prisma/prisma-user-repository'
import EmailSender from '../../external/mail-service/implementation/sendGridMailProvider'

const prismaUserRepository = new PrismaUserRepository()
// eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
const emailSender = new EmailSender(process.env.SENDGRID_API_KEY as string)
const createUserUseCase = new CreateUserUseCase(
  emailSender,
  prismaUserRepository
)
const createUserController = new CreateUserController(
  createUserUseCase
)

export { createUserController }
