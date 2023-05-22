import { Router, Response, Request, NextFunction } from 'express'
import UserController from './userController'

const userRoutes = Router()

userRoutes.get('/', async (_req, res: Response, next: NextFunction) => {
  try {
    const response = await UserController.getUsers()
    return res.send(response)
  } catch (err) {
    next(err)
  }
})

userRoutes.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await UserController.getUser(req.params.id)
      return res.send(response)
    } catch (err) {
      next(err)
    }
  }
)

userRoutes.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await UserController.requestAuth(req.body.email)
      return res.send(response)
    } catch (err) {
      next(err)
    }
  }
)

userRoutes.post('/auth', async (req, res, next) => {
  try {
    const response = await UserController.auth(req.body.id, req.body.token)
    return res.send(response)
  } catch (err) {
    next(err)
  }
})

userRoutes.post('/register/admin', async (req: Request, res: Response) => {
  const response = await UserController.registerAdmin(req.body)
  return res.send(response)
})


export default userRoutes
