import { Entity } from '../core/Entity'

export interface MessageProps {
  email: string
  name: string
}

export class Message extends Entity<MessageProps> {
  public email: string
  public name: string
  public constructor (props: MessageProps) {
    super()
    this.email = props.email
    this.name = props.name
  }
}
