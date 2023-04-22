import { Get, Path, Route, Tags } from 'tsoa'
import { Company, User } from '@prisma/client'
import CompanyService from './companyService'

@Route('company')
@Tags('Companies')
export default class CompanyController {
  @Get('/')
  async getCompanies(): Promise<Company[]> {
    return CompanyService.fetchAll()
  }

  @Get('/{id}')
  async getCompany(
    @Path() id: string
  ): Promise<Company & { employees: User[] }> {
    return CompanyService.fetchById(id)
  }
}
