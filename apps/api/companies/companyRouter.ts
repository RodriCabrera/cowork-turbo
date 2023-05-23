import { Router } from 'express'
import CompanyController from './companyController'
import Auth from '../middleware/auth.middleware'

const companyRouter = Router()

companyRouter.get('/', async (req, res, next) => {
  try {
    const response = await CompanyController.getCompanies()
    return res.send(response)
  } catch (err) {
    next(err)
  }
})

companyRouter.get('/:id', async (req, res, next) => {
  try {
    const response = await CompanyController.getCompany(req.params.id)
    return res.send(response)
  } catch (err) {
    next(err)
  }
})

companyRouter.post(
  '/:id/employees',
  Auth.authorizeAdmin,
  async (req, res, next) => {
    try {
      const response = await CompanyController.addEmployees(
        req.body,
        req.params.id,
        req.user
      )
      return res.send(response)
    } catch (err) {
      next(err)
    }
  }
)

companyRouter.put('/:id', Auth.authorizeAdmin, async (req, res, next) => {
  try {
    const response = await CompanyController.editCompany(
      req.params.id,
      req.body,
      req.user
    )
    return res.send(response)
  } catch (err) {
    next(err)
  }
})

export default companyRouter
