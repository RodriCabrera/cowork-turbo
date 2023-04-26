import { Router } from 'express'
import SuperAdminController from './superAdminController'

const superAdminRouter = Router()

superAdminRouter.post('/auth', async (req, res, next) => {
  try {
    if (await SuperAdminController.auth(req.body.id, req.body.token)) {
      res.sendStatus(200)
    } else res.sendStatus(401)
  } catch (err) {
    next(err)
  }
})
superAdminRouter.post('/login', async (req, res, next) => {
  try {
    if (await SuperAdminController.requestAuth(req.body.email)) {
      res.sendStatus(200)
    } else res.sendStatus(401)
  } catch (err) {
    next(err)
  }
})

export default superAdminRouter
