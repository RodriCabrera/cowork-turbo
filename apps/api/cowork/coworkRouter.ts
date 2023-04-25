import { Router } from 'express'
import CoworkController from './coworkController'

const coworkRoutes = Router()

coworkRoutes.get('/', async (req, res) => {
  const response = await CoworkController.getCoworks()
  res.send(response)
})
coworkRoutes.get('/:id', async (req, res) => {
  const response = await CoworkController.getOne(req.params.id)
  res.send(response)
})
coworkRoutes.put('/:id', async (req, res) => {
  const response = await CoworkController.edit(req.params.id, req.body)
  res.send(response)
})
coworkRoutes.post('/', async (req, res) => {
  const response = await CoworkController.create(
    req.body.email,
    req.body.phone,
    req.body.address
  )
  res.send(response)
})
coworkRoutes.delete('/:id', async (req, res) => {
  const response = await CoworkController.remove(req.params.id)
  res.send(response)
})

export default coworkRoutes
