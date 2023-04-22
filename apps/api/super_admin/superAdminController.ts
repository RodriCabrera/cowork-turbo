import { Controller, Route, Tags, Post, BodyProp } from 'tsoa'
import SuperAdminService from './superAdminService'

@Route('superadmin')
@Tags('Super admin auth')
export default class SuperAdminController extends Controller {
  @Post('/auth')
  static async auth(@BodyProp() id: string, @BodyProp() token: string) {
    return SuperAdminService.checkAuthorization(id, token)
  }

  @Post('/login')
  static async requestAuth(@BodyProp() email: string) {
    return SuperAdminService.sendAuthEmail(email)
  }
}
