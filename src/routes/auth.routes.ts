/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Request, type Response } from 'express'
import { createUserController } from '../factories/create-user'
import { passwordRecoveryController } from '../factories/password-recovery'

const AuthRouter = express.Router()

AuthRouter.post(
  '/register/:roleName',
  async (request: Request, response: Response) => {
    return await createUserController.handle(request, response)
  }
)

AuthRouter.post(
  '/forgot/password',
  async (request: Request, response: Response) => {
    return await passwordRecoveryController.handle(request, response)
  }
)

export default AuthRouter
