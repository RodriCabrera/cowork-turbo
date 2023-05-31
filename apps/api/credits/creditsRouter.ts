import { Router } from 'express'
import CreditsController from './creditsController'

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
creditsRouter.post('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await CreditsController.addCredits(id, req.body)
    return res.send(result)
  } catch (err) {
    next(err)
  }
})

export default creditsRouter
