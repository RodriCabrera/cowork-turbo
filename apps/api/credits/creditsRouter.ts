import { Router } from 'express'
import CreditsController from './creditsController'
// TODO: add auth middlewares
// import Auth from '../middleware/auth.middleware'

const creditsRouter = Router()

creditsRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await CreditsController.getWalletById(id)
    return res.send(result)
  } catch (err) {
    next(err)
  }
})

creditsRouter.get('/:id/:employeeId', async (req, res, next) => {
  try {
    const { id, employeeId } = req.params
    const result = await CreditsController.getAssignedToEmployee(id, employeeId)
    return res.send(result)
  } catch (err) {
    next(err)
  }
})

creditsRouter.post('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await CreditsController.addCredits(id, req.body)
    return res.send(result)
  } catch (err) {
    next(err)
  }
})

creditsRouter.post('/:id/:employeeId', async (req, res, next) => {
  try {
    const { id, employeeId } = req.params
    const result = await CreditsController.assignToEmployee(
      id,
      employeeId,
      req.body
    )
    return res.send(result)
  } catch (err) {
    next(err)
  }
})

export default creditsRouter
