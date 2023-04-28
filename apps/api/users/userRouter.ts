import { Router, Response, Request } from 'express'
import UserController from './userController'

const userRoutes = Router()

userRoutes.get('/', async (_req, res: Response) => {
  const controller = new UserController()
  const response = await controller.getUsers()
  return res.send(response)
})

userRoutes.get('/:id', async (req: Request, res: Response) => {
  const controller = new UserController()
  const response = await controller.getUser(req.params.id)
  return res.send(response)
})

export default userRoutes
