import { Router } from 'express'
import CoworkController from './coworkController'
import Auth from '../middleware/auth.middleware'
import { CoworkFilters } from './coworkTypes'

const coworkRoutes = Router()

coworkRoutes.get('/', async (req, res, next) => {
  try {
    const { status, city, country, sort, count, cursor, page } = req.query
    const response = await CoworkController.getCoworks(
      status?.toString() as CoworkFilters['status'],
      city?.toString(),
      country?.toString(),
      sort?.toString(),
      count ? parseInt(count.toString()) : undefined,
      cursor?.toString(),
      page ? parseInt(page.toString()) : undefined
    )
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
coworkRoutes.put('/:id', Auth.authorizeSuperAdmin, async (req, res, next) => {
  try {
    const response = await CoworkController.edit(req.params.id, req.body)
    res.send(response)
  } catch (err) {
    next(err)
  }
})
coworkRoutes.post('/', Auth.authorizeSuperAdmin, async (req, res, next) => {
  try {
    const response = await CoworkController.create(req.body, req)
    res.send(response)
  } catch (err) {
    next(err)
  }
})
coworkRoutes.delete(
  '/:id',
  Auth.authorizeSuperAdmin,
  async (req, res, next) => {
    try {
      const response = await CoworkController.remove(req.params.id)
      res.send(response)
    } catch (err) {
      next(err)
    }
  }
)

export default coworkRoutes
