import { PrismaClient } from '@prisma/client'
import { genSalt, hash, compare } from 'bcryptjs'
import { v4 as uuid } from 'uuid'
import jwt from 'jsonwebtoken'
import MailService from '../mail/mailService'

// TODO: Create html template for login mail

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
      const userJWT = jwt.sign(
        {
          ...superAdmin,
          token
        },
        process.env.SESSION_SECRET
      )
      const mailService = MailService.getInstance()
      await mailService.sendMail({
        from: 'noreply@localhost.com',
        to: superAdmin.mail,
        subject: 'Login to your account',
        html: `
          <a href="http://localhost:3000/api/superadmin?access_token=${userJWT}">Login</a>
        `
      })
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
