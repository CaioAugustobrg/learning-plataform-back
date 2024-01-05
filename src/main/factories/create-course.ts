import { PrismaCourseRepository } from '../../external/repositories/prisma/prisma-course-repository'
import { CreateCourseController } from '../../controllers/create-course'
import { CreateCourseUseCase } from '../../usecases/create-course/create-course'
import { PrismaUserRepository } from '../../external/repositories/prisma/prisma-user-repository'

const prismaCourseRepository = new PrismaCourseRepository()
const prismaUserRepository = new PrismaUserRepository()
const createCourseUseCase = new CreateCourseUseCase(
  prismaCourseRepository,
  prismaUserRepository
)
const createCourseController = new CreateCourseController(
  createCourseUseCase
)
export { createCourseController }
