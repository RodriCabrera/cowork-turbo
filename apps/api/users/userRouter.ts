import { Router, Response, Request } from 'express'
import UserController from './userController'

const userRoutes = Router()

userRoutes.get('/', async (_req, res: Response) => {
  const response = await UserController.getUsers()
  return res.send(response)
})

userRoutes.get('/:id', async (req: Request, res: Response) => {
  const response = await UserController.getUser(req.params.id)
  return res.send(response)
})

userRoutes.post('/login', async (req: Request, res: Response) => {
  const response = await UserController.requestAuth(req.body.email)
  return res.send(response)
})

userRoutes.post('/register/admin', async (req: Request, res: Response) => {
  const response = await UserController.registerAdmin(req.body)
  return res.send(response)
})

export default userRoutes
