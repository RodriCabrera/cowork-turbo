import { compare, genSalt, hash } from 'bcryptjs'
import { v4 as uuid } from 'uuid'
import jwt from 'jsonwebtoken'
import config from '../config/config'

export default class AuthUtils {
  static async generateHashToken(): Promise<{
    token: string
    cryptedToken: string
  }> {
    const salt = await genSalt(10)
    const token = uuid()
    const cryptedToken = await hash(token, salt)
    return {
      token,
      cryptedToken
    }
  }

  static async compareHashToken(
    token: string,
    input: string
  ): Promise<boolean> {
    return compare(token, input)
  }

  static createJWT(data: any) {
    return jwt.sign(data, config.sessionSecret)
  }
}
