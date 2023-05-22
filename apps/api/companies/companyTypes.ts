import CompanyValidator from './companyValidator'

const editCompanySchema = CompanyValidator.getCompanyEditSchema()
export type EmployeeInput = {
  name?: string
  email: string
}

export type CompanyEditInput = ReturnType<typeof editCompanySchema.parse>
