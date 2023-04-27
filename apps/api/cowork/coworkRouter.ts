import { Router } from 'express'
import CoworkController from './coworkController'

const coworkRoutes = Router()

coworkRoutes.get('/', async (req, res, next) => {
  try {
    const response = await CoworkController.getCoworks()
    res.send(response)
  } catch (err) {
    next(err)
  }
})
coworkRoutes.get('/:id', async (req, res, next) => {
  try {
    const response = await CoworkController.getOne(req.params.id)
    res.send(response)
  } catch (err) {
    next(err)
  }
})
coworkRoutes.put('/:id', async (req, res, next) => {
  try {
    const response = await CoworkController.edit(req.params.id, req.body)
    res.send(response)
  } catch (err) {
    next(err)
  }
})
coworkRoutes.post('/', async (req, res, next) => {
  try {
    const response = await CoworkController.create(req.body)
    res.send(response)
  } catch (err) {
    next(err)
  }
})
coworkRoutes.delete('/:id', async (req, res, next) => {
  try {
    const response = await CoworkController.remove(req.params.id)
    res.send(response)
  } catch (err) {
    next(err)
  }
})

export default coworkRoutes
