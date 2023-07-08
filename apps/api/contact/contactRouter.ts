import { Router } from 'express'
import ContactController from './contactController'

const contactRoutes = Router()

contactRoutes.post('/', async (req, res, next) => {
  try {
    const response = await ContactController.sendContact(req.body)
    return res.send(response)
  } catch (err) {
    next(err)
  }
})

export default contactRoutes
