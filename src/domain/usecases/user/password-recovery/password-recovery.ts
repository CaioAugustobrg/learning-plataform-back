import { type HttpResponse } from '../../../controllers/ports/http'
import { PasswordRecovery } from '../../../entities/password-recovery'
import type EmailSender from '../../../external/mail-service/implementation/sendGridMailProvider'
import { type PrismaPasswordRecoveryRepository } from '../../../external/repositories/prisma/prisma-password-recovery-repository'
import ApiError from '../../../utils/apiError'
import { type IMessage } from '../../ports/mail-service'
import { ok } from '../../../controllers/helpers/http-helper'
import mjml2html from 'mjml'
import { v4 as uuidv4 } from 'uuid'

export class PasswordRecoveryUseCase {
  constructor (
    private readonly prismaPasswordRecoveryRepository: PrismaPasswordRecoveryRepository,
    private readonly emailSender: EmailSender
  ) {}

  async handle (
    HttpRequest: {
      email: string
    }
  ): Promise<HttpResponse> {
    const expiration = new Date()
    expiration.setMinutes(expiration.getMinutes() + 30)
    const token = uuidv4()
    const getUser = await this.prismaPasswordRecoveryRepository.findUserByEmail(HttpRequest.email)
    if (getUser === null) {
      throw new ApiError({
        message: 'Usuário não encontrado'
      })
    }
    const userId = getUser?.id
    const passwordRecovery = new PasswordRecovery({ userId, expiration, token })
    const createPasswordRecovery = await this.prismaPasswordRecoveryRepository.create(
      passwordRecovery
    )
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
      to: getUser.email,
      from: 'caioaugustobrg@gmail.com',
      subject: 'Obrigado por usar essa API',
      html: htmlOutput.html,
      amp: true
    }
    await this.emailSender.sendEmail(msg)
    return ok(createPasswordRecovery)
  }
}
