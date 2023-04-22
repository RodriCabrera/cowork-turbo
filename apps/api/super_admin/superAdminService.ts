import { PrismaClient } from '@prisma/client'
import { genSalt, hash, compare } from 'bcryptjs'
import { v4 as uuid } from 'uuid'

export default class SuperAdminService {
  static _client = new PrismaClient()

  static async sendAuthEmail(email: string): Promise<boolean> {
    this._client.$connect()
    try {
      const salt = await genSalt(10)
      const token = uuid()
      const cryptedToken = await hash(token, salt)
      const superAdmin = await this._client.superAdmin.update({
        where: {
          mail: email
        },
        data: {
          token: cryptedToken
        }
      })
      // TODO: Send email with user data & token as JWT
      return true
    } catch (err) {
      return false
    } finally {
      this._client.$disconnect()
    }
  }

  static async checkAuthorization(id: string, token: string): Promise<boolean> {
    this._client.$connect()
    try {
      const superAdmin = await this._client.superAdmin.findUniqueOrThrow({
        where: { id }
      })
      return compare(token, superAdmin.token)
    } catch (err) {
      return false
    } finally {
      this._client.$disconnect()
    }
  }
}
