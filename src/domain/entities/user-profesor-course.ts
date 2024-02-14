import { Entity } from '../core/Entity'

export interface UserProfessorCourseProps {
  userId: string
  courseId: string
}

export class UserProfessorCourse extends Entity<UserProfessorCourse> {
  public userId: string
  public courseId: string
  public constructor (props: UserProfessorCourseProps) {
    super()
    this.userId = props.userId
    this.courseId = props.courseId
  }
}
