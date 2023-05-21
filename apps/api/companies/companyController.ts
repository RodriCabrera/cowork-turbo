import { Get, Path, Route, Tags, Put, Body, Request, Post, Query } from 'tsoa'
import CompanyService from './companyService'
import { CompanyEditInput, EmployeeInput } from './companyTypes'
import CustomError, { ERROR_CODES } from '../errors/customError'

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
    @Request() user?: Express.Request['user']
  ) {
    if (!user) throw new CustomError('Unauthorized', 401)
    return CompanyService.editById(id, data, user.id)
  }

  @Post('/employees')
  static async addEmployees(
    @Body() employees: EmployeeInput[],
    @Query() idCompany?: string,
    @Request() user?: Express.Request['user']
  ) {
    if (!user) throw new CustomError('Unauthorized', 401)
    if (!idCompany) {
      throw new CustomError(
        'Company id is required',
        406,
        ERROR_CODES.QueryMissingValue
      )
    }
    return CompanyService.createEmployees(idCompany, employees, user.id)
  }
}
