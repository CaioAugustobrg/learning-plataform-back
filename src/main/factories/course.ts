import { PrismaCourseRepository } from '../../external/repositories/prisma/prisma-course-repository'
import { CourseController } from '../../presentation/controllers/course-controller'
import { CreateCourseUseCase } from '../../domain/usecases/course/create-course/create-course'
import { PrismaUserRepository } from '../../external/repositories/prisma/prisma-user-repository'
import { FindAllCoursesUseCase } from '../../domain/usecases/course/find-all-courses/find-all-courses'
import { DeleteCourseUseCase } from '../../domain/usecases/course/delete-course/delete-course'

const prismaCourseRepository = new PrismaCourseRepository()
const prismaUserRepository = new PrismaUserRepository()
const createCourseUseCase = new CreateCourseUseCase(
  prismaCourseRepository,
  prismaUserRepository
)
const findAllCourses = new FindAllCoursesUseCase(
  prismaCourseRepository
)
const deleteCourseUseCase = new DeleteCourseUseCase(
  prismaCourseRepository
)
const courseController = new CourseController(
  createCourseUseCase,
  findAllCourses,
  deleteCourseUseCase)
export { courseController }
