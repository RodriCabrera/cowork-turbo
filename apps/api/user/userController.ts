import { Get, Path, Route } from 'tsoa'
import UserService from './userService'
import { User } from '@prisma/client'

@Route('user')
export default class UserController {
  @Get('/')
  async getUsers(): Promise<User[]> {
    return UserService.fetchAll()
  }

  @Get('/{id}')
  async getUser(@Path() id: string): Promise<User> {
    return UserService.fetchById(id)
  }
}
