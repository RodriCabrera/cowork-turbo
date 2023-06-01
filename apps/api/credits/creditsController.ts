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
  static async addCredits(@Path() id: string, @Body() input: AddCreditsInput) {
    return CreditsService.addCredits(id, input.ammount)
  }

  @Get('/{id}/{employeeId}')
  static async getAssignedToEmployee(
    @Path() id: string,
    @Path() employeeId: string
  ) {
    return CreditsService.getCreditsAssignedToEmployee(id, employeeId)
  }

  @Post('/{id}/{employeeId}')
  static async assignToEmployee(
    @Path() id: string,
    @Path() employeeId: string,
    @Body() input: AddCreditsInput
  ) {
    return CreditsService.assignCreditsToEmployee(id, employeeId, input.ammount)
  }
}
