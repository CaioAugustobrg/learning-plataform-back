/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import ApiError from '../../utils/apiError'
import { User } from '../../entities/user'
import { type PrismaUserRepository } from '../../external/repositories/prisma/prisma-user-repository'
import type EmailSender from '../../external/mail-service/implementation/sendGridMailProvider'
import { type IMessage } from '../ports/mail-service'
import { type UserProps } from '../../entities/user'
import { generateWelcomeEmailToProfessorContent, generateWelcomeEmailToStudentContent } from '../../external/mail-service/implementation/generate-email'

export class CreateUserUseCase {
  constructor (
    private readonly emailSender: EmailSender,
    private readonly prismaUserRepository: PrismaUserRepository
  ) {}

  async handle (
    userProps: UserProps,
    roleName: string
  ): Promise<null | ApiError> {
    try {
      const userEmailAlreadyExists =
        await this.prismaUserRepository.findUserByEmail(userProps.email)
      if (userEmailAlreadyExists) {
        throw new ApiError({
          code: 409,
          message: 'Já existe um usuário com esse email'
        })
      }
      const userCpfAlreadyExists =
        await this.prismaUserRepository.findUserByCpf(userProps.cpf)
      if (userCpfAlreadyExists) {
        throw new ApiError({
          code: 409,
          message: 'Já existe um usuário com esse CPF'
        })
      }
      const userPhoneNumberAlreadyExists =
        await this.prismaUserRepository.findUserByPhone(userProps.phone)
      if (userPhoneNumberAlreadyExists) {
        throw new ApiError({
          code: 409,
          message: 'Já existe um usuário com esse número de telefone'
        })
      }
    } catch (err: any) {
      throw new ApiError({
        code: err.code,
        message: err.message
      })
    }

    try {
      if (roleName === 'student') {
        const user = new User(userProps)
        await this.prismaUserRepository.create(user, roleName)
        const emailContent: IMessage = generateWelcomeEmailToStudentContent(user.email)
        await this.emailSender.sendEmail(emailContent)
        return null
      } else {
        const userRegisterDocumentAlreadyExists =
        await this.prismaUserRepository.findUserByRegisterDocument(userProps.userRegisterDocument)
        if (userRegisterDocumentAlreadyExists) {
          throw new ApiError({
            code: 409,
            message: 'Já existe um usuário com esse número de registro'
          })
        }
        const user = new User(userProps)
        await this.prismaUserRepository.create(user, roleName)
        const emailContent: IMessage = generateWelcomeEmailToProfessorContent(user.email)
        await this.emailSender.sendEmail(emailContent)
        return null
      }
    } catch (error: any) {
      throw new ApiError({
        code: error.code,
        message: error.message
      })
    }
  }
}
