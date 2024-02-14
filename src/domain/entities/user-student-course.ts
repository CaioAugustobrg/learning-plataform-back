import { Entity } from '../core/Entity'

export interface UserStudentCourseProps {
  userId: string
  courseId: string
}

export class UserStudentCourse extends Entity<UserStudentCourse> {
  public userId: string
  public courseId: string
  public constructor (props: UserStudentCourseProps) {
    super()
    this.userId = props.userId
    this.courseId = props.courseId
  }
}
