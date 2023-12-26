import { Entity } from '../core/domain/Entity'
export interface UserProps {
  cpf: string
  name: string
  email: string
  phone: string
  password: string
  birthDate: Date
  userRole?: any
  picture?: string | null
  speciality?: string | null
  education?: string | null
  systemRole: 'CREATED'
  userRegisterDocument?: string
  userToken?: string | null
  cep?: string | null
  professionalExperience?: string | null
  professionalGoal?: string | null
}

export class User extends Entity<UserProps> {
  public cpf: string
  public name: string
  public email: string
  public phone: string
  public password: string
  public birthDate: Date
  public userRole?: any
  public picture?: string | null
  public speciality?: string | null
  public education?: string | null
  public systemRole: 'CREATED'
  public userRegisterDocument?: string
  public userToken?: string | null
  public cep?: string | null
  public professionalExperience?: string | null
  public professionalGoal?: string | null

  public constructor (props: UserProps) {
    super()
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
