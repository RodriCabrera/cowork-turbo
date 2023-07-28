import { Prisma, Company } from '@prisma/client'
import { App } from '../app'
import supertest from 'supertest'
import { prismaMock } from '../prisma/singleton'

const mockCompany: Company = {
  id: 'mock',
  email: '',
  name: '',
  walletId: ''
}

const NOT_FOUND_ERROR = new Prisma.PrismaClientKnownRequestError(
  'Record not found',
  { code: 'P2025', clientVersion: '' }
)

describe('Companies', () => {
  const app = new App('8090', 'Test server')
  beforeAll(() => app.start())
  afterAll(() => app.stop())

  describe('GET companies routes', () => {
    describe('Get all', () => {
      it('Should return status 200 and an array of companies', async () => {
        prismaMock.company.findMany.mockResolvedValueOnce([
          mockCompany,
          mockCompany,
          mockCompany
        ])
        const response = await supertest(app.app).get('/companies')
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body[0]).toMatchObject<Company>({
          id: expect.anything(),
          name: expect.anything(),
          email: expect.anything(),
          walletId: expect.anything()
        })
      })
    })
    describe('Get by id', () => {
      describe('Provided id exists', () => {
        it('Should return status 200 and one Company', async () => {
          prismaMock.company.findUniqueOrThrow.mockResolvedValueOnce(
            mockCompany
          )
          const response = await supertest(app.app).get('/companies/mock')
          expect(response.statusCode).toBe(200)
        })
      })
      describe('Provided id doesnt exist', () => {
        it('Should return 404 status and an Error', async () => {
          prismaMock.company.findUniqueOrThrow.mockRejectedValueOnce(
            NOT_FOUND_ERROR
          )
          const response = await await supertest(app.app).get(
            '/companies/fakeId'
          )
          expect(response.statusCode).toBe(404)
          expect(prismaMock.company.findUniqueOrThrow).toHaveBeenCalled()
        })
      })
    })
  })
})
