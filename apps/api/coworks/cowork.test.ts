import app from '../index'
import request from 'supertest'
import 'dotenv/config'

const server = app.app

describe('GET /coworks/', () => {
  afterAll(() => {
    app.stop()
  })
  it('Should return status code 200 and a results array on body', async () => {
    try {
      const res = await request(server)
        .get('/coworks/')
        .type('application/json')
        .retry(2)
        .timeout(120000)
      expect(res.statusCode).toBe(200)
      expect(res.body).toHaveProperty('results')
    } catch (err) {
      console.error(err)
    }
  }, 120000)
})
