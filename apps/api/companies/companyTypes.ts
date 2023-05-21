import CompanyValidator from './companyValidator'

const editCompanySchema = CompanyValidator.getCompanyEditSchema()
export type EmployeeInput = {
  name?: string
  mail: string
}

export type CompanyEditInput = ReturnType<typeof editCompanySchema.parse>
