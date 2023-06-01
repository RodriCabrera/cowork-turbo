import CompanyValidator from './companyValidator'
import { Company, User, Wallet } from '@prisma/client'

const editCompanySchema = CompanyValidator.getCompanyEditSchema()
export type EmployeeInput = {
  firstName?: string
  lastName?: string
  email: string
}

export type CompanyEditInput = ReturnType<typeof editCompanySchema.parse>
export type CompanyGetById = Company & { employees: User[]; wallet: Wallet }
export type CompanyGetAll = Company[]
export type CompanyEmployeeAdded = {
  email: User['email']
  sent: boolean
}[]
