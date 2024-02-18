/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
// main.ts
import { type IMessage } from '../domain/usecases/ports/mail-service'
import { generateWelcomeEmailToStudentContent } from '../external/mail-service/implementation/generate-email'
import EmailSender from '../external/mail-service/implementation/sendGridMailProvider'
import app from './config/app'
import RabbitmqClient from './config/rabbit-mq-client'
// import RabbitmqClient from './config/rabbit-mq-client'

const port = 3030

app.listen(port, async () => {
  try {
    const server = new RabbitmqClient(process.env.RABBITMQ_URL!)
    await server.start()
    await server.consume('email-queue', async (message: any) => {
      const response = message.content.toString()
      const responseToJson = JSON.parse(response)
      console.log(responseToJson)
      const emailContent: IMessage = generateWelcomeEmailToStudentContent(responseToJson.email)
      // const emailData = {
      //   to: responseToJson.email,
      //   from: responseToJson.from,
      //   subject: responseToJson.subject
      //   // html: new DOMParser().parseFromString(responseToJson.html, 'text/html')
      // }
      console.log('server', emailContent)
      const emailSender = new EmailSender(process.env.SENDGRID_API_KEY!)
      await emailSender.sendEmail(emailContent)
    }
    )
    console.log(`Express started on http://127.0.0.1:${port}; press CTRL + C to terminate.`)
  } catch (error) {
    console.error('Error connecting to Redis:', error)
  }
})
