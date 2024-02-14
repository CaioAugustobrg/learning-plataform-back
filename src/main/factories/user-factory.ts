/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { UserController } from '../../presentation/controllers/user-controller'
import { CreateUserUseCase } from '../../domain/usecases/user/create-user/create-user'
import { PrismaUserRepository } from '../../external/repositories/prisma/prisma-user-repository'
import EmailSender from '../../external/mail-service/implementation/sendGridMailProvider'
import { UserLoginUseCase } from '../../domain/usecases/user/user-login/user-login'
import { PasswordRecoveryUseCase } from '../../domain/usecases/user/password-recovery/password-recovery'
import { PrismaPasswordRecoveryRepository } from '../../external/repositories/prisma/prisma-password-recovery-repository'
import { TryRecoveryPasswordUseCase } from '../../domain/usecases/user/try-recover-password/try-recover-password'
import { DeleteUserUseCase } from '../../domain/usecases/user/delete-user/delete-user'

const prismaUserRepository = new PrismaUserRepository()

const emailSender = new EmailSender(process.env.SENDGRID_API_KEY!)

const createUserUseCase = new CreateUserUseCase(
  emailSender,
  prismaUserRepository
)

const userLoginUseCase = new UserLoginUseCase(
  prismaUserRepository
)

const prismaPasswordRecoveryRepository = new PrismaPasswordRecoveryRepository()

const forgotPasswordUseCase = new PasswordRecoveryUseCase(
  prismaPasswordRecoveryRepository,
  emailSender
)

const tryRecoveryPasswordUseCase = new TryRecoveryPasswordUseCase(
  prismaPasswordRecoveryRepository
)

const deleteCourseUseCase = new DeleteUserUseCase(
  prismaUserRepository
)

const userController = new UserController(
  createUserUseCase,
  userLoginUseCase,
  forgotPasswordUseCase,
  tryRecoveryPasswordUseCase,
  deleteCourseUseCase
)

export { userController }
