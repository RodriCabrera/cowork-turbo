import { PrismaClient } from '@prisma/client'
import {
  mockDeep,
  mockReset,
  mockClear,
  DeepMockProxy
} from 'jest-mock-extended'

import prisma from './client'

jest.mock('./client', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>()
}))

beforeEach(() => {
  mockReset(prismaMock)
})

afterEach(() => {
  mockClear(prismaMock)
})

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
