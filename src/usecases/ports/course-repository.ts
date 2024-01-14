import { type Course } from '../../entities/course'

export interface CourseRepository {
  findCourseByTitle: (title: string) => Promise<Course | null>
  create: (props: Course, userProfessorId: string) => Promise<Course | null>
  findAll: () => Promise<Course[] | null>
  deleteCourse: (courseId: string) => Promise<void>
  findCourseById: (courseId: string) => Promise<Course | null>
}
