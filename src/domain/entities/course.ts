import { Entity } from '../core/Entity'
import { type CourseClass } from './course-class'
import { type UserProfessorCourse } from './user-profesor-course'
import { type UserStudentCourse } from './user-student-course'

export interface CourseProps {
  title: string
  userProfessorCourse: UserProfessorCourse[]
  userStudentCourse?: UserStudentCourse[]
  courseClass?: CourseClass[]
  type: 'INPERSON' | 'ONLINE'
  summary?: string
  currentlyYear?: Date
  time?: number
  price?: number
}

export class Course extends Entity<CourseProps> {
  public title: string
  public userProfessorCourse: UserProfessorCourse[]
  public userStudentCourse?: UserStudentCourse[]
  public courseClass?: CourseClass[]
  public type: 'INPERSON' | 'ONLINE'
  public summary?: string
  public time?: number
  public price?: number
  public currentlyYear?: Date
  public constructor (props: CourseProps) {
    super()
    this.title = props.title
    this.userProfessorCourse = props.userProfessorCourse
    this.userStudentCourse = props.userStudentCourse
    this.courseClass = props.courseClass
    this.type = props.type
    this.summary = props.summary
    this.time = props.time
    this.price = props.price
    this.currentlyYear = new Date()
  }
}
