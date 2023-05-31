import { Get, Route, Tags, Path, Post, Body } from 'tsoa'

@Route('credits')
@Tags('Credits')
export default class CreditsController {
  @Get('/{id}')
  static async getWalletById(@Path() id: string) {}

  @Post('/{id}')
  static async addCredits(
    @Path() id: string,
    @Body() data: any // TODO type
  ) {}
}
