import supertest from 'supertest'
import { App } from '../app'
import CoworkService from './coworkService'
import { Prisma, Address } from '@prisma/client'
import { CoworkFull } from './coworkTypes'
import CustomError from '../errors/customError'
import { prismaMock } from '../prisma/singleton'

const mockAddress: Address = {
  id: '',
  country: '',
  city: '',
  streetName: '',
  number: '',
  floor: null,
  apartment: null,
  postalCode: null
}
const mockCowork: CoworkFull = {
  id: '123456789',
  address: mockAddress,
  addressId: '',
  amenities: null,
  amenitiesId: '',
  status: 'ACTIVE',
  image: 'google.com/image1.jpg',
  name: 'test cowork. com',
  email: 'test@test.com',
  description: 'shamalayan test',
  phone: '+114454218',
  rating: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  updatedBy: 'testAdmin',
  openSchedule: null,
  openScheduleId: ''
}

const NOT_FOUND_ERROR = new Prisma.PrismaClientKnownRequestError(
  'Record not found',
  { code: 'P2025', clientVersion: '' }
)

// TODO: Change implementations for Prisma mock

describe('Coworks', () => {
  const app = new App('8080', 'Test')
  beforeAll(() => app.start())
  afterAll(() => app.stop())

  describe('GET coworks routes', () => {
    describe('Get by id', () => {
      describe('given it does not exists', () => {
        it('should return 404', async () => {
          prismaMock.cowork.findUniqueOrThrow.mockRejectedValueOnce(
            NOT_FOUND_ERROR
          )
          const { statusCode } = await supertest(app.app).get(
            '/coworks/testing'
          )
          expect(statusCode).toBe(404)
          expect(prismaMock.cowork.findUniqueOrThrow).toHaveBeenCalled()
        })
      })
      describe('given it exists', () => {
        it('should return 200 and a cowork', async () => {
          prismaMock.cowork.findUniqueOrThrow.mockResolvedValueOnce(mockCowork)
          const { statusCode, body } = await supertest(app.app).get(
            `/coworks/${mockCowork.id}`
          )
          expect(statusCode).toBe(200)
          expect(body).toEqual({
            ...mockCowork,
            updatedAt: mockCowork.updatedAt.toISOString(),
            createdAt: mockCowork.createdAt.toISOString()
          })
          expect(prismaMock.cowork.findUniqueOrThrow).toHaveBeenCalled()
        })
      })
    })
    describe('Get all', () => {
      describe('given no params', () => {
        it('Should return 200 and a cowork list and a cursor', async () => {
          prismaMock.cowork.findMany.mockResolvedValueOnce([mockCowork])
          const { statusCode, body } = await supertest(app.app)
            .get('/coworks?count=1')
            .accept('application/json')
          expect(statusCode).toBe(200)
          expect(body).toHaveProperty('results')
          expect(body.results).toBeInstanceOf(Array)
          expect(body.results[0]).toMatchObject({
            ...mockCowork,
            updatedAt: mockCowork.updatedAt.toISOString(),
            createdAt: mockCowork.createdAt.toISOString()
          })
          expect(prismaMock.cowork.findMany).toHaveBeenCalled()
          expect(body).toHaveProperty('cursor')
        })
      })
    })
    describe('post cowork', () => {
      describe('authenticated', () => {
        describe('given data is valid', () => {
          it('should return 200 and cowork data', async () => {
            // TODO: Resolve authentication
          })
        })
      })
      describe('unauthenticated', () => {
        it('should return 401 error', async () => {
          // TODO: Resolve no authentication prevent middleware of being called
        })
      })
    })
  })
})
