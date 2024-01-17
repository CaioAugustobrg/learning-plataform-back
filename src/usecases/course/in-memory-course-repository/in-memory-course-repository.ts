/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type UserProfessorCourse } from '@prisma/client'
import { type Course } from '../../../entities/course'
import { type CourseRepository } from '../../ports/course-repository'

export class InMemoryCourseRepository implements CourseRepository {
  courses: Course[] = []
  userProfesorCourse: UserProfessorCourse[] = [
    {
      courseId: '2',
      createdAt: new Date(),
      id: '1',
      userId: '3'
    }
  ]

  constructor (courses: Course[]) {
    this.courses = courses
  }

  async findCourseByTitle (title: string): Promise<Course | null> {
    let course: Course
    for (course of this?.courses) {
      if (course.title === title) {
        return course as unknown as Course
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
      return course as unknown as Course
    } else {
      return null
    }
  }

  async deleteCourse (courseId: string): Promise<void> {
    await this.deleteCourse(courseId)
    this.courses.filter((course) => courseId !== course.id)
  }

  async findAll (): Promise<Course[] | null> {
    const findAllCourses = await this.findAll()
    if (!findAllCourses) {
      return null
    } else {
      return this.courses as unknown as Course[]
    }
  }

  async findCourseById (courseId: string): Promise<Course | null> {
    const findCourseById = this.findCourseById(courseId)
    if (!findCourseById) {
      return null
    } else {
      return this.courses.filter(
        (course) => courseId === course.id
      ) as unknown as Course
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
