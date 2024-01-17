/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type UserProfessorCourse } from '@prisma/client'
import { type Course } from '../../../entities/course'
import { type CourseRepository } from '../../ports/course-repository'

export class InMemoryCourseRepository implements CourseRepository {
  courses: Course[] = []
  userProfesorCourse: UserProfessorCourse[] = [{
    courseId: '2',
    createdAt: new Date(),
    id: '1',
    userId: '3'
  }]

  constructor (courses: Course[]) {
    this.courses = courses
  }

  async findCourseByTitle (title: string): Promise<Course | null> {
    let course: Course
    for (course of this?.courses) {
      if (course.title === title) {
        return course
      }
    }
    return null
  }

  async create (course: Course, userProfesorId: string): Promise<Course | null> {
    const existsTitle = await this.findCourseByTitle(course.title)
    if (!existsTitle) {
      this.courses.push(course)
      const userProfessorCourseTable: UserProfessorCourse = {
        id: course.id,
        courseId: course.id,
        userId: userProfesorId,
        createdAt: course.createdAt
      }
      this.userProfesorCourse.push(userProfessorCourseTable)
      return course
    } else {
      return null
    }
  }
//   async create (user: User): Promise<User | null> {
//     const existsByCpf = await this.findUserByCpf(user.cpf)
//     const existsByEmail = await this.findUserByEmail(user.email)
//     if (!existsByCpf && !existsByEmail) {
//       this.users.push(user)
//       return user
//     } else {
//       return null
//     }
//   }
}
