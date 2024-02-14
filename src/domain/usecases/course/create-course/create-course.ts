/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Course, type CourseProps } from '../../../entities/course'
import { type PrismaCourseRepository } from '../../../../external/repositories/prisma/prisma-course-repository'
import { type PrismaUserRepository } from '../../../../external/repositories/prisma/prisma-user-repository'
import ApiError from '../../../../utils/apiError'

export class CreateCourseUseCase {
  constructor (
    private readonly prismaCourseRepository: PrismaCourseRepository,
    private readonly prismaUserRepository: PrismaUserRepository
  ) {}

  async handle (
    courseProps: CourseProps,
    userProfesorId: string
  ): Promise<null | ApiError> {
    // try {
    console.log(userProfesorId)
    const courseTitleAlreadyExists = await this.prismaCourseRepository.findCourseByTitle(courseProps.title)
    if (courseTitleAlreadyExists) {
      throw new ApiError({
        code: 409,
        message: 'Já existe um curso com esse título'
      })
    }
    const newCourse = new Course(courseProps)
    const findUserProfesorById = await this.prismaUserRepository.findUserById(userProfesorId)
    if (!findUserProfesorById) {
      throw new ApiError({
        code: 404,
        message: 'Nenhum usuário encontrado'
      })
    }
    console.log(findUserProfesorById)
    await this.prismaCourseRepository.create(newCourse, findUserProfesorById?.id)
    return null
    // } catch (err: any) {
    //   throw new ApiError({
    //     code: err.code,
    //     message: err.message
    //   })
    // }
  }
}
