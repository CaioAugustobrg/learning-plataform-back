/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type PrismaCourseRepository } from '../../../../external/repositories/prisma/prisma-course-repository'
import ApiError from '../../../../utils/apiError'

export class DeleteCourseUseCase {
  constructor (
    private readonly prismaCourseRepository: PrismaCourseRepository
  ) {}

  async handle (
    courseId: string
  ): Promise<void> {
    try {
      const courseExists = await this.prismaCourseRepository.findCourseById(courseId)
      if (!courseExists) {
        throw new ApiError({
          code: 404,
          message: 'Curso não encontrado'
        })
      } else {
        await this.prismaCourseRepository.deleteCourse(courseId)
      }
    } catch (error: any) {
      throw new ApiError({
        code: error.code,
        message: error.message
      })
    }
  }
}
