/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PasswordRecoveryController } from '../../controllers/password-recovery'
import { PrismaPasswordRecoveryRepository } from '../../external/repositories/prisma/prisma-password-recovery-repository'
import EmailSender from '../../external/mail-service/implementation/sendGridMailProvider'
import { TryRecoveryPasswordUseCase } from '../../usecases/try-recover-password/try-recover-password'
import { PasswordRecoveryUseCase } from '../../usecases/password-recovery/password-recovery'

const prismaPasswordRecoveryRepository = new PrismaPasswordRecoveryRepository()
const emailSender = new EmailSender(process.env.SENDGRID_API_KEY!)
const passwordRecoveryUseCase = new PasswordRecoveryUseCase(
  prismaPasswordRecoveryRepository,
  emailSender
)

const tryPasswordRecoveryUseCase = new TryRecoveryPasswordUseCase(
  prismaPasswordRecoveryRepository
)

const passwordRecoveryController = new PasswordRecoveryController(
  passwordRecoveryUseCase,
  tryPasswordRecoveryUseCase
)

export { passwordRecoveryUseCase, passwordRecoveryController }
