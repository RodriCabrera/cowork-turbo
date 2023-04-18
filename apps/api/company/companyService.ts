import { PrismaClient } from '@prisma/client'

export default class CompanyService {
  private static _client = new PrismaClient()
  static async fetchAll() {
    this._client.$connect()
    try {
      const response = this._client.company.findMany()
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
      const response = this._client.company.findUnique({
        where: {
          id
        },
        include: {
          employees: true
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
