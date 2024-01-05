/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type Request, type Response } from 'express'
import { type CreateCourseUseCase } from '../usecases/create-course/create-course'
// import { MissingParamError } from './errors'

export class CreateCourseController {
  constructor (private readonly createCourseUseCase: CreateCourseUseCase) {}
  async handle (request: Request, response: Response) {
    const httpRequest = {
      body: request.body,
      params: request.params
    }
    const {
      title,
      type,
      summary,
      time,
      price
    } = httpRequest.body
    if (!title || !type || !summary || !time || !price) {
        return response.status(400).json({
            msg: 'Todos os campos são obrigatórios'
          })
    }
    // if ((type !== 'INPERSON') || (type !== 'ONLINE')) {
    //     return response.status(400).json({
    //         msg: "Type deve ser 'INPERSON' ou 'ONLINE'"
    //     })
    // } else {
      try {
        const httpResponse = await this.createCourseUseCase.handle(httpRequest.body, request.params.userProfesorId)
        return response.status(201).json(httpResponse)
      } catch (error: any) {
        return response.status(error.code || 500).json(error.message)
      }

       //  }
  }
}
