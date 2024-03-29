/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Course } from '../../../domain/entities/course'
import { type CourseRepository } from '../../../domain/usecases/ports/course-repository'
import { PrismaHelper } from './helpers/prisma-helper'

export class PrismaCourseRepository implements CourseRepository {
  async create (props: Course, userProfesorId: string): Promise<Course | null> {
    const create = new Course(props)
    console.log(create.currentlyYear)

    const createCourse = await PrismaHelper.course.create({
      data: {
        id: create.id,
        title: create.title,
        type: create.type,
        summary: create.summary,
        time: create.time,
        price: create.price,
        currentlyYear: create.currentlyYear,
        createdAt: create.createdAt
      }
    })
    await PrismaHelper.userProfessorCourse.create({
      data: {
        userId: userProfesorId,
        courseId: create.id
      }
    })
    if (createCourse) {
      return createCourse as unknown as Course
    } else {
      return null
    }
  }

  async findCourseByTitle (title: string): Promise<Course | null> {
    return (await PrismaHelper?.course?.findUnique({
      where: { title }
    })) as unknown as Course | null
  }

  async findAll (): Promise<Course[] | null> {
    const findAllCourse = await PrismaHelper.course.findMany({})
    if (findAllCourse) {
      return findAllCourse as unknown as Course[]
    } else {
      return null
    }
  }

  async deleteCourse (courseId: string): Promise<void> {
    await PrismaHelper.course.delete({
      where: {
        id: courseId
      }
    })
  }

  async findCourseById (courseId: string): Promise<Course | null> {
    return (await PrismaHelper.course.findUnique({
      where: {
        id: courseId
      }
    })) as unknown as Course | null
  }
}
