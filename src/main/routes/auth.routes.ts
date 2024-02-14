/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Request, type Response } from 'express'
import { userController } from '../factories/user-factory'
// import axios from 'axios'
// import ApiError from '../utils/apiError'
// import { UserController } from '../controllers/user-controller'

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
  '/login',
  async (request: Request, response: Response) => {
    console.log(response.json)
    return await userController.userLogin(request, response)
  }
)

AuthRouter.post(
  '/github/token/:roleName',
  async (request: Request, response: Response) => {
    console.log(request.body)
    await userController.userGithubLogin(request, response)
    //   const {
    //     client_id,
    //     client_secret,
    //     code
    //   } = request.body

  //   await axios.post(
  //     'https://github.com/login/oauth/access_token',
  //     {
  //       client_id,
  //       client_secret,
  //       code
  //     },
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json'
  //       }
  //     }
  //   )
  //     .then((result) => {
  //       void axios.get('https://api.github.com/user', {
  //         headers: {
  //           Authorization: `Bearer ${result.data.access_token}`
  //         }
  //       }).then((response) => {
  //         console.log(response.data)
  //       })
  //       response.send('you are authorized ' + result.data.access_token)
  //     }).catch((err: any) => {
  //       throw new ApiError({
  //         code,
  //         error: err
  //       })
  //     })
  })

export default AuthRouter
