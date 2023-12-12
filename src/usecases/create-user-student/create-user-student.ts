/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import ApiError from '../../utils/apiError'
import { User } from '../../entities/user'
import { type PrismaUserRepository } from '../../external/repositories/prisma/prisma-user-repository'
import type EmailSender from '../../external/mail-service/implementation/sendGridMailProvider'
import mjml2html from 'mjml'
import { type IMessage } from '../ports/mail-service'
import { type UserProps } from '../../entities/user'

export class CreateUserStudentUseCase {
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
      const user = new User(userProps)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const createUser = await this.prismaUserRepository.create(user, roleName)

      const htmlOutput = mjml2html(`
      <mjml>
      <mj-head>
        <mj-attributes>
          <mj-text font-family="Arial, sans-serif"></mj-text>
        </mj-attributes>
      </mj-head>
      <mj-body>
        <mj-container>
          <mj-section>
            <mj-column>
              <mj-divider border-color="rgb(0, 452, 298)"></mj-divider>
              <mj-text>
                Espero que esta mensagem o encontre bem. Obrigado por usar essa API.
              </mj-text>
              <mj-text>
                Não hesite em entrar em contato comigo. Estou pronto para podermos conversar.
              </mj-text>
              <mj-text>
                Agradeço a sua atenção e confiança na minha API.
              </mj-text>
              <mj-text>
                Atenciosamente,
              </mj-text>
              <mj-text>
                Caio.
              </mj-text>
              <mj-social mode="horizontal" icon-size="30px" align="center">
                <mj-social-element name="medium" href="https://medium.com/@caioaugustobrg"></mj-social-element>
                <mj-social-element name="website" href="https://caioaugusto-github-io-git-main-caioaugusto.vercel.app/"></mj-social-element>
                <mj-social-element name="linkedin" href="https://www.linkedin.com/in/caioaugustobrg/"></mj-social-element>
                <mj-social-element name="youtube" href="https://www.youtube.com/channel/UCrrXifdL79cNySnxN0U6w4Q"></mj-social-element>
              </mj-social>
            </mj-column>
          </mj-section>
        </mj-container>
      </mj-body>
    </mjml>
    
                `)
      const msg: IMessage = {
        to: user.email,
        from: 'caioaugustobrg@gmail.com',
        subject: 'Obrigado por usar essa API',
        html: htmlOutput.html,
        amp: true
      }
      await this.emailSender.sendEmail(msg)
      return null
    } catch (error: any) {
      throw new ApiError({
        code: error.code,
        message: error.message
      })
    }
  }
}
