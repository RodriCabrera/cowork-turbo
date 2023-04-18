import { Router, Response } from 'express'
import UserController from './userController'

const userRoutes = Router()

userRoutes.get('/', async (_req, res: Response) => {
  const controller = new UserController()
  const response = await controller.getUser()
  return res.send(response)
})

userRoutes.post('/', async (req, res) => {
  const controller = new UserController()
  const response = await controller.postUser()
  return res.send(response)
})

export default userRoutes
