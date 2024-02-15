import { type Message } from '../../entities/rabbit-mq-message'

export interface MessageRepository {
  send: (props: Message) => Promise<boolean>
// consume
}
