import { PrismaClient, Cowork, Address } from '@prisma/client'
import PrismaErrors from '../errors/prismaErrors'

export default class CoworkService {
  private static _client = new PrismaClient()

  static async createCowork(
    basicData: Pick<Cowork, 'email' | 'phone'>,
    address: Omit<Address, 'id'>
  ): Promise<Cowork> {
    try {
      return await this._client.cowork.create({
        data: {
          ...basicData,
          address: {
            create: {
              ...address
            }
          }
        }
      })
    } catch (err) {
      PrismaErrors.parseError(err)
      if (err instanceof Error) throw err
    }
  }

  static async fetchAll(): Promise<Cowork[]> {
    try {
      return await this._client.cowork.findMany()
    } catch (err) {
      PrismaErrors.parseError(err, 'Coworks')
      if (err instanceof Error) throw err
    }
  }

  static async fetchById(id: string): Promise<Cowork> {
    try {
      return await this._client.cowork.findUniqueOrThrow({
        where: { id }
      })
    } catch (err) {
      PrismaErrors.parseError(err, 'Cowork')
      if (err instanceof Error) throw err
    }
  }

  static async edit(id: string, data: Partial<Cowork>): Promise<Cowork> {
    try {
      return await this._client.cowork.update({
        where: { id },
        data: {
          ...data
        }
      })
    } catch (err) {
      PrismaErrors.parseError(err, 'Cowork')
      if (err instanceof Error) throw err
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      return !!(await this._client.cowork.delete({ where: { id } }))
    } catch (err) {
      PrismaErrors.parseError(err, 'Cowork')
      if (err instanceof Error) throw err
    }
  }
}
