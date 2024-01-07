/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Course } from '../../entities/course'
import { type PrismaCourseRepository } from '../../external/repositories/prisma/prisma-course-repository'
import ApiError from '../../utils/apiError'

export class FindAllCoursesUseCase {
  constructor (
    private readonly prisaCourseRepository: PrismaCourseRepository
  ) {}

  async handle (): Promise<Course[] | ApiError> {
    const findAllCourses = await this.prisaCourseRepository.findAll()
    if (!findAllCourses) {
      throw new ApiError({
        code: 404,
        message: 'Nenhum curso encontrado'
      })
    } else {
      return findAllCourses
    }
  }
}
