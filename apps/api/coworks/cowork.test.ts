import supertest from 'supertest'
import { App } from '../app'
import CoworkService from './coworkService'
import { Address } from '@prisma/client'
import { CoworkFull } from './coworkTypes'
import CustomError from '../errors/customError'

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

describe('coworks', () => {
  let app: App
  beforeAll(() => {
    app = new App('8080', 'Test')
    app.start()
  })
  afterAll(() => {
    app.stop()
  })
  describe('get coworks route', () => {
    describe('by id', () => {
      describe('given it does not exists', () => {
        it('should return 404', async () => {
          const getCoworkServiceMock = jest
            .spyOn(CoworkService, 'fetchById')
            .mockRejectedValueOnce(new CustomError('not found', 404))
          const id = 'pipicuculele'
          const { statusCode } = await supertest(app.app).get(`/coworks/${id}`)
          expect(statusCode).toBe(404)
          expect(getCoworkServiceMock).toHaveBeenCalled()
        })
      })
      describe('given it exists', () => {
        it('should return 200 and a cowork', async () => {
          const getCoworkServiceMock = jest
            .spyOn(CoworkService, 'fetchById')
            .mockReturnValueOnce(new Promise((resolve) => resolve(mockCowork)))
          const { statusCode, body } = await supertest(app.app).get(
            `/coworks/${mockCowork.id}`
          )
          expect(statusCode).toBe(200)
          expect(body).toEqual({
            ...mockCowork,
            updatedAt: mockCowork.updatedAt.toISOString(),
            createdAt: mockCowork.createdAt.toISOString()
          })
          expect(getCoworkServiceMock).toHaveBeenCalled()
        })
      })
    })
    describe('all', () => {
      describe('given no params', () => {
        it('Should return 200 and a cowork list', async () => {
          const getCoworkServiceMock = jest
            .spyOn(CoworkService, 'fetchAll')
            .mockReturnValueOnce(
              new Promise((resolve) =>
                resolve({ results: [mockCowork], cursor: '' })
              )
            )
          const { statusCode, body } = await supertest(app.app).get('/coworks')
          expect(statusCode).toBe(200)
          expect(body).toEqual({
            results: [
              {
                ...mockCowork,
                updatedAt: mockCowork.updatedAt.toISOString(),
                createdAt: mockCowork.createdAt.toISOString()
              }
            ],
            cursor: ''
          })
          expect(getCoworkServiceMock).toHaveBeenCalled()
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
