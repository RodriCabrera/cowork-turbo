import { Get, Path, Route, Tags, Put, Body, Request } from 'tsoa'
import CompanyService from './companyService'
import { CompanyEditInput } from './companyTypes'
import CustomError from '../errors/customError'

@Route('companies')
@Tags('Companies')
export default class CompanyController {
  @Get('/')
  static async getCompanies() {
    return CompanyService.fetchAll()
  }

  @Get('/{id}')
  static async getCompany(@Path() id: string) {
    return CompanyService.fetchById(id)
  }

  @Put('/{id}')
  static async editCompany(
    @Path() id: string,
    @Body() data: CompanyEditInput,
    @Request() user: Express.Request['user']
  ) {
    if (!user) throw new CustomError('Unauthorized', 401)
    return CompanyService.editById(id, data, user.id)
  }
}
