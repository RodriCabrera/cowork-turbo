import { PrismaClient } from '@prisma/client'

export default class UserService {
  private static _client = new PrismaClient()
  static async fetchAll() {
    this._client.$connect()
    try {
      const response = this._client.user.findMany()
      return response
    } catch (err) {
      console.error(err)
    } finally {
      this._client.$disconnect()
    }
  }

  static async fetchById(id: string) {
    this._client.$connect()
    try {
      const response = this._client.user.findUnique({
        where: {
          id
        }
      })
      return response
    } catch (err) {
      console.error(err)
    } finally {
      this._client.$disconnect()
    }
  }
}
