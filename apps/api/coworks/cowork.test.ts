import app from '../index'
import request from 'supertest'
import 'dotenv/config'

const server = app.app

afterAll(() => {
  app.stop()
})

describe('GET /coworks/', () => {
  it('Should return status code 200 and a results array on body', async () => {
    const res = await request(server).get('/coworks/')
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('results')
  })
})
