import { type PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, type DeepMockProxy } from 'jest-mock-extended'

import { PrismaHelper } from './src/external/repositories/prisma/helpers/prisma-helper'

jest.mock('./src/external/repositories/prisma/helpers/prisma-helper', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>()
}))

// beforeEach(() => {
//   mockReset(prismaMock)
// })

export const prismaMock = PrismaHelper as unknown as DeepMockProxy<PrismaClient>
