// EmailContent.ts
import mjml2html from 'mjml'
import { type IMessage } from '../../../usecases/ports/mail-service'

export const generateWelcomeEmailToProfessorContent = (userEmail: string): IMessage => {
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

  return {
    to: userEmail,
    from: 'caioaugustobrg@gmail.com',
    subject: 'Obrigado por usar essa API',
    html: htmlOutput.html,
    amp: true
  }
}

export const generateWelcomeEmailToStudentContent = (userEmail: string): IMessage => {
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

  return {
    to: userEmail,
    from: 'caioaugustobrg@gmail.com',
    subject: 'Obrigado por usar essa API',
    html: htmlOutput.html,
    amp: true
  }
}
