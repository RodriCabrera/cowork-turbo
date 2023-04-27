import { PrismaClient, Cowork } from '@prisma/client'
import PrismaErrors from '../errors/prismaErrors'
import { EditCoworkInput } from './coworkTypes'
import CoworkValidate from './coworkValidation'

export default class CoworkService {
  private static _client = new PrismaClient()

  static async createCowork(data: EditCoworkInput): Promise<Cowork> {
    try {
      const parsedData = CoworkValidate.validateCreate(data)
      return await this._client.cowork.create({
        data: {
          email: parsedData.email,
          phone: parsedData.phone,
          address: {
            create: {
              apartment: parsedData.address?.apartment,
              city: parsedData.address?.city,
              country: parsedData.address?.country,
              floor: parsedData.address?.floor,
              number: parsedData.address?.number,
              postalCode: parsedData.address?.postalCode,
              streetName: parsedData.address?.streetName
            }
          }
        }
      })
    } catch (err) {
      PrismaErrors.parseError(err, 'Cowork', true)
      CoworkValidate.parseError(err)
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
      const parsedData = CoworkValidate.validateEdit(data)
      return await this._client.cowork.update({
        where: { id },
        data: {
          email: parsedData.email,
          phone: parsedData.phone,
          address: {
            update: { ...parsedData.address }
          }
        },
        include: {
          address: true
        }
      })
    } catch (err) {
      PrismaErrors.parseError(err, 'Cowork')
      CoworkValidate.parseError(err)
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
