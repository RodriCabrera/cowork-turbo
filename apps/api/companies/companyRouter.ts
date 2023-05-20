import { Router } from 'express'
import CompanyController from './companyController'
import Auth from '../middleware/auth.middleware'

const companyRouter = Router()

companyRouter.get('/', async (req, res) => {
  const response = await CompanyController.getCompanies()
  return res.send(response)
})

companyRouter.get('/:id', async (req, res) => {
  const response = await CompanyController.getCompany(req.params.id)
  return res.send(response)
})

companyRouter.post(
  '/employees/:id',
  Auth.authorizeAdmin,
  async (req, res) => {}
)

companyRouter.put('/:id', Auth.authorizeAdmin, async (req, res) => {
  const response = CompanyController.editCompany(
    req.params.id,
    req.body,
    req.user
  )
  return res.send(response)
})

export default companyRouter
