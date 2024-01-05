import { Entity } from '../core/domain/Entity'
import { type Course } from './course'

export interface UserProfessorCourseProps {
  userId: string
  course: Course[]
}

export class UserProfessorCourse extends Entity<UserProfessorCourse> {
  public userId: string
  public courseId: Course[]
  public constructor (props: UserProfessorCourseProps) {
    super()
    this.userId = props.userId
    this.courseId = props.course
  }
}
