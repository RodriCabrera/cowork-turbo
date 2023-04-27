import { PrismaClient, Cowork } from '@prisma/client'
import PrismaErrors from '../errors/prismaErrors'
import { EditCoworkInput } from './coworkTypes'

export default class CoworkService {
  private static _client = new PrismaClient()

  static async createCowork(data: EditCoworkInput): Promise<Cowork> {
    try {
      return await this._client.cowork.create({
        data: {
          email: data.email,
          phone: data.phone,
          address: {
            create: {
              ...data.address
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
      return await this._client.cowork.findMany({
        include: {
          address: true
        }
      })
    } catch (err) {
      PrismaErrors.parseError(err, 'Coworks')
      if (err instanceof Error) throw err
    }
  }

  static async fetchById(id: string): Promise<Cowork> {
    try {
      return await this._client.cowork.findUniqueOrThrow({
        where: { id },
        include: {
          address: true
        }
      })
    } catch (err) {
      PrismaErrors.parseError(err, 'Cowork')
      if (err instanceof Error) throw err
    }
  }

  static async edit(id: string, data: EditCoworkInput): Promise<Cowork> {
    try {
      return await this._client.cowork.update({
        where: { id },
        data: {
          email: data.email,
          phone: data.phone,
          address: {
            update: { ...data.address }
          }
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
