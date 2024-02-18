import { type Connection, type Channel, connect, type Message } from 'amqplib'

export default class RabbitmqClient {
  private conn!: Connection
  private channel!: Channel

  constructor (private readonly uri: string) {}

  async start (): Promise<void> {
    this.conn = await connect(this.uri)
    this.channel = await this.conn.createChannel()
  }

  async publishInQueue (queue: string, message: string): Promise<boolean> {
    return this.channel.sendToQueue(queue, Buffer.from(message))
  }

  async consume (queue: string, callback: (message: Message) => void): Promise<any> {
    return await this.channel.consume(queue, (message) => {
      if (message !== null) {
        callback(message)
        this.channel.ack(message)
      }
    })
  }
}
