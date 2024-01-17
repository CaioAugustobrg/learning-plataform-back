/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type Request, type Response } from 'express'
import { type CreateCourseUseCase } from '../usecases/course/create-course/create-course'
import { type FindAllCoursesUseCase } from '../usecases/course/find-all-courses/find-all-courses'
import { type DeleteCourseUseCase } from '../usecases/course/delete-course/delete-course'
// import { MissingParamError } from './errors'

export class CourseController {
  constructor (
    private readonly createCourseUseCase: CreateCourseUseCase,
    private readonly findAllCourses: FindAllCoursesUseCase,
    private readonly deleteCourseById: DeleteCourseUseCase
  ) {}

  async createCourse (request: Request, response: Response) {
    const httpRequest = {
      body: request.body,
      params: request.params
    }
    const { title, type, summary, time, price } = httpRequest.body
    if (!title || !type || !summary || !time || !price) {
      return response.status(400).json({
        msg: 'Todos os campos são obrigatórios'
      })
    }
    try {
      const httpResponse = await this.createCourseUseCase.handle(
        httpRequest.body,
        request.params.userProfesorId
      )
      return response.status(201).json(httpResponse)
    } catch (error: any) {
      return response.status(error.code || 500).json(error.message)
    }
  }

  async getAllCourses (request: Request, response: Response) {
    try {
      const httpResponse = await this.findAllCourses.handle()
      return response.status(200).json(httpResponse)
    } catch (error: any) {
      return response.status(error.code || 500).json(error.message)
    }
  }

  async deleteCourse (request: Request, response: Response) {
    const { courseId } = request.body
  try {
    await this.deleteCourseById.handle(courseId)
    return response.status(200)
  } catch (error: any) {
    return response.status(error.code || 500).json(error.message)
  }
  }
}
