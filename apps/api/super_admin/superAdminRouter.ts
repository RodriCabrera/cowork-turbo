import { Router } from 'express'
import SuperAdminController from './superAdminController'

const superAdminRouter = Router()

superAdminRouter.post('/auth', async (req, res) => {
  if (await SuperAdminController.auth(req.body.id, req.body.token)) {
    res.sendStatus(200)
  } else res.sendStatus(401)
})
superAdminRouter.post('/login', async (req, res) => {
  if (await SuperAdminController.requestAuth(req.body.email)) {
    res.sendStatus(200)
  } else res.sendStatus(401)
})

export default superAdminRouter
