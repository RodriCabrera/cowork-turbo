import { Get, Route, Tags, Path, Post, Body } from 'tsoa'
import { AddCreditsInput } from './creditsTypes'
import CreditsService from './creditsService'

@Route('credits')
@Tags('Credits')
export default class CreditsController {
  @Get('/{id}')
  static async getWalletById(@Path() id: string) {
    return CreditsService.getById(id)
  }

  @Post('/{id}')
  static async addCredits(@Path() id: string, @Body() data: AddCreditsInput) {
    return CreditsService.addCredits(id, data)
  }

  @Post('/{id}/{employeeId}')
  static async assignToEmployee(
    @Path() id: string,
    @Path() employeeId: string,
    @Body() data: AddCreditsInput
  ) {
    return CreditsService.assignCreditsToEmployee(id, employeeId, data)
  }
}
