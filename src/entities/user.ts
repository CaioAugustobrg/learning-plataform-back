import { Entity } from '../core/domain/Entity'
export interface UserProps {
  googleId?: string
  cpf: string
  name: string
  email: string
  phone: string
  password: string
  birthDate: Date
  userRole?: any
  picture?: string
  speciality?: string
  education?: string
  systemRole: 'CREATED'
  userRegisterDocument?: string
  userToken?: string
  cep?: string
  professionalExperience?: string
  professionalGoal?: string
}

export class User extends Entity<UserProps> {
  public googleId?: string
  public cpf: string
  public name: string
  public email: string
  public phone: string
  public password: string
  public birthDate: Date
  public userRole?: any
  public picture?: string
  public speciality?: string
  public education?: string
  public systemRole: 'CREATED'
  public userRegisterDocument?: string
  public userToken?: string
  public cep?: string
  public professionalExperience?: string
  public professionalGoal?: string

  public constructor (props: UserProps) {
    super()
    this.googleId = props.googleId
    this.cpf = props.cpf
    this.name = props.name
    this.email = props.email
    this.phone = props.phone
    this.password = props.password
    this.birthDate = props.birthDate
    this.userRole = props.userRole
    this.picture = props.picture
    this.speciality = props.speciality
    this.education = props.education
    this.systemRole = props.systemRole
    this.userRegisterDocument = props.userRegisterDocument
    this.userToken = props.userToken
    this.cep = props.cep
    this.professionalExperience = props.professionalExperience
    this.professionalGoal = props.professionalGoal
  }
}
