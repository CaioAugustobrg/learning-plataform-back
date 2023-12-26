import { Entity } from '../core/domain/Entity'
export interface IPasswordRecoveryProps {
  token: string
  expiration: Date
  userId: string
}

export class PasswordRecovery extends Entity<IPasswordRecoveryProps> {
  public token: string
  public expiration: Date
  public userId: string

  public constructor (props: IPasswordRecoveryProps) {
    super()
    this.token = props.token
    this.expiration = props.expiration
    this.userId = props.userId
  }
}
