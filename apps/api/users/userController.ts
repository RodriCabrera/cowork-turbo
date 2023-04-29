import {
  BodyProp,
  Get,
  Path,
  Post,
  Response,
  Route,
  SuccessResponse,
  Tags
} from 'tsoa'
import UserService from './userService'
import { User } from '@prisma/client'

@Route('users')
@Tags('Users')
export default class UserController {
  @Get('/')
  async getUsers(): Promise<User[]> {
    return UserService.fetchAll()
  }

  @Get('/{id}')
  async getUser(@Path() id: string): Promise<User> {
    return UserService.fetchById(id)
  }

  /**
   *  Send login email to the address given if the user exists
   * @returns OK or 401
   */
  @Response('401', 'Unauthorized')
  @SuccessResponse('200', 'Email sent')
  @Post('/login')
  static async requestAuth(@BodyProp() email: string) {
    return UserService.sendAuthEmail(email)
  }

  /**
   * Receives user's ID & token and checks if those match the database.
   * @returns OK or 401
   */
  @Response('401', 'Unauthorized')
  @SuccessResponse('200', 'Authorized')
  @Post('/auth')
  static async auth(@BodyProp() id: string, @BodyProp() token: string) {
    return UserService.checkAuthorization(id, token)
  }
}
