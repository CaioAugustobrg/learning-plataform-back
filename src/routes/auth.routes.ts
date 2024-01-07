/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Request, type Response } from 'express'
import { userController } from '../main/factories/user-factory'

const AuthRouter = express.Router()

AuthRouter.post(
  '/register/:roleName',
  async (request: Request, response: Response) => {
    return await userController.createUser(request, response)
  }
)

AuthRouter.post(
  '/forgot/password',
  async (request: Request, response: Response) => {
    return await userController.passwordRecovery(request, response)
  }
)

AuthRouter.post(
  '/',
  async (request: Request, response: Response) => {
    return await userController.userLogin(request, response)
  }
)

export default AuthRouter
