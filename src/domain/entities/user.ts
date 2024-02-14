import { Entity } from '../core/Entity'
export interface UserProps {
  googleId?: string
  githubId?: string
  // cpf: string
  name: string
  email: string
  phone?: string
  password?: string
  birthDate?: Date
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
  // public cpf: string
  public name: string
  public githubId?: string
  public email: string
  public phone?: string
  public password?: string
  public birthDate?: Date
  public userRole?: any
  public picture?: string
  // public speciality?: string
  // public education?: string
  public systemRole: 'CREATED'
  // public userRegisterDocument?: string
  public userToken?: string
  public cep?: string
  // public professionalExperience?: string
  // public professionalGoal?: string

  public constructor (props: UserProps) {
    super()
    // this.cpf = props.cpf
    this.name = props.name
    this.email = props.email
    this.userRole = props.userRole
    // this.speciality = props.speciality
    // this.education = props.education
    this.systemRole = 'CREATED'
    // this.userRegisterDocument = props.userRegisterDocument
    // this.professionalExperience = props.professionalExperience
    // this.professionalGoal = props.professionalGoal
  }
}
