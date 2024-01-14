/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Request, type Response } from 'express'
import { courseController } from '../main/factories/course'

const AdminRouter = express.Router()

AdminRouter.post(
  '/course/create/:userProfesorId',
  async (request: Request, response: Response) => {
    return await courseController.createCourse(request, response)
  }
)

AdminRouter.get(
  '/course/find-all',
  async (request: Request, response: Response) => {
    return await courseController.getAllCourses(request, response)
  }
)

AdminRouter.delete(
  'course/delete',
  async (request: Request, response: Response) => {
    return await courseController.deleteCourse(request, response)
  }
)

export default AdminRouter
