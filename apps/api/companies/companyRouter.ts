import { Router } from 'express'
import CompanyController from './companyController'

const companyRouter = Router()

companyRouter.get('/', async (_req, res) => {
  const controller = new CompanyController()
  const response = await controller.getCompanies()
  return res.send(response)
})

export default companyRouter
