import { Get, Path, Route, Tags } from 'tsoa'
import CompanyService from './companyService'

@Route('companies')
@Tags('Companies')
export default class CompanyController {
  @Get('/')
  async getCompanies() {
    return CompanyService.fetchAll()
  }

  @Get('/{id}')
  async getCompany(@Path() id: string) {
    return CompanyService.fetchById(id)
  }
}
