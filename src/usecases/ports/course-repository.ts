import { type Course } from '../../entities/course'

export interface CourseRepository {
  findCourseByTitle: (title: string) => Promise<Course | null>
  create: (props: Course, userProfessorId: string) => Promise<void>

}
