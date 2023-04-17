import { Get, Route } from 'tsoa'

interface Prueba {
  mensaje: string
}

@Route('user')
export default class UserController {
  @Get('/')
  async getUser(): Promise<Prueba> {
    return {
      mensaje: 'olis'
    }
  }
}
