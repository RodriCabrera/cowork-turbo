import app from '../index'
import request from 'supertest'
import 'dotenv/config'

describe('GET /coworks/', () => {
  it('Should return status code 200 and a results array on body', async () => {
    const res = await request(app).get('/coworks/')
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('results')
  })
})
