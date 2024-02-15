import * as amqplib from 'amqplib'
const amqpUrl: string = process.env.AMQP_URL ?? 'amqp://localhost:5673'

let channel, connection
async function connectQueue (): Promise<void> {
  try {
    connection = await amqplib.connect(amqpUrl)
    channel = await connection.createChannel()
    await channel.assertQueue('test222222-queue')
    console.log('Connected to RabbitMq sucessfully!')
  } catch (error) {
    console.log(error)
  }
}

export default connectQueue
