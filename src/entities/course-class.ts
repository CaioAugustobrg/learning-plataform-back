import { Entity } from '../core/domain/Entity'

export interface CourseClassProps {
  numberClass: number
  courseId: string
  free: boolean
  format: 'TEXT' | 'VIDEO'
}

export class CourseClass extends Entity<CourseClassProps> {
  public numberClass: number
  public courseId: string
  public free: boolean
  public format: 'TEXT' | 'VIDEO'
  public constructor (props: CourseClassProps) {
    super()
    this.numberClass = props.numberClass
    this.courseId = props.courseId
    this.free = props.free
    this.format = props.format
  }
}
