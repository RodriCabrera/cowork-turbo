import {
  Controller,
  Route,
  Tags,
  Post,
  BodyProp,
  SuccessResponse,
  Response
} from 'tsoa'
import SuperAdminService from './superAdminService'

@Route('superadmins')
@Tags('Super admin auth')
export default class SuperAdminController extends Controller {
  /**
   * Receives superadmin ID & token and checks if those match the database.
   * @returns OK or 401
   */
  @Response('401', 'Unauthorized')
  @SuccessResponse('200', 'Authorized')
  @Post('/auth')
  static async auth(@BodyProp() id: string, @BodyProp() token: string) {
    return SuperAdminService.checkAuthorization(id, token)
  }

  /**
   *  Send login email to the address given if the superadmin user exists
   * @returns OK or 401
   */
  @Response('401', 'Unauthorized')
  @SuccessResponse('200', 'Email sent')
  @Post('/login')
  static async requestAuth(@BodyProp() email: string) {
    return SuperAdminService.sendAuthEmail(email)
  }
}
