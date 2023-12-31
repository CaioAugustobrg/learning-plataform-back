/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Request, type Response } from 'express'
import { courseController } from '../main/factories/create-course'

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
export default AdminRouter
