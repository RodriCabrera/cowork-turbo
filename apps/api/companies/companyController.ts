import {
  Get,
  Path,
  Route,
  Tags,
  Put,
  Body,
  Request,
  Post,
  Response,
  SuccessResponse
} from 'tsoa'
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

  @SuccessResponse(200, 'Company with employees', 'CompanyGetById')
  @Response<CustomError>(404, 'Company not found')
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

  @Post('/:id/employees')
  static async addEmployees(
    @Body() employees: EmployeeInput[],
    @Path() id: string,
    @Request() user?: Express.Request['user']
  ) {
    if (!user) throw new CustomError('Unauthorized', 401)
    return CompanyService.createEmployees(id, employees, user.id)
  }
}
