/* eslint-disable @typescript-eslint/no-unused-vars */
import { type UserProfessorCourse } from '../../../entities/user-profesor-course'
import { type Course } from '../../../entities/course'
import { InMemoryCourseRepository } from './in-memory-course-repository'

describe('In memory course repository', () => {
  const userProfesorCourse: UserProfessorCourse[] = [{
    createdAt: new Date(),
    courseId: '2',
    updateAt: new Date(),
    id: '1',
    userId: '3'
  }]
  const courses: Course[] = [
    {
      title: 'ts1itl2ea22aa1s2s3s',
      type: 'ONLINE',
      summary: 'summary123',
      price: 400,
      time: 20,
      updateAt: new Date(),
      createdAt: new Date(),
      currentlyYear: new Date(),
      id: '2',
      userProfessorCourse: userProfesorCourse
    }
  ]
  let courseRepo: InMemoryCourseRepository
  beforeEach(() => {
    courseRepo = new InMemoryCourseRepository(courses)
  })
  it('Should call a method when finding a course by title', async () => {
    const spy = jest.spyOn(courseRepo, 'findCourseByTitle')
    const course = await courseRepo.findCourseByTitle('ts1itl2ea22aa1s2s3s')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('ts1itl2ea22aa1s2s3s')
    expect(course?.title).toEqual('ts1itl2ea22aa1s2s3s')
    expect(course).not.toBeNull()
  })
})
