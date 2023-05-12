import { PrismaClient, Cowork } from '@prisma/client'
import PrismaErrors from '../errors/prismaErrors'
import {
  EditCoworkInput,
  CreateCoworkInput,
  CoworkFull,
  CoworkFilters
} from './coworkTypes'
import CoworkValidate from './coworkValidation'

export default class CoworkService {
  private static _client = new PrismaClient()

  static async createCowork(
    data: CreateCoworkInput,
    author: string
  ): Promise<Cowork> {
    try {
      const parsedData = CoworkValidate.validateCreate(data)
      return await this._client.cowork.create({
        data: {
          email: parsedData.email,
          name: parsedData.name,
          phone: parsedData.phone,
          updatedBy: author,
          description: parsedData.description,
          status: parsedData.status,
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

  private static $getCoworkFilterParameters(filters?: CoworkFilters) {
    if (!filters) return {}
    let params = {}
    if (filters.status) {
      const validatedStatus = CoworkValidate.validateStatus(
        filters.status.toString()
      )
      params = { ...params, status: { equals: validatedStatus } }
    }
    return params
  }

  private static $getAddressFilterParameters(filters?: CoworkFilters) {
    if (!filters) return {}
    let params = {}
    if (filters.city) {
      params = {
        ...params,
        city: { contains: filters.city }
      }
    }
    if (filters.country) {
      params = {
        ...params,
        country: { contains: filters.country }
      }
    }
    return params
  }

  private static $getSortParameter(sort: string) {
    if (!sort) return {}
    if (sort[0] === '-') {
      return CoworkValidate.insertValueIntoCoworkObject(
        sort.substring(1),
        'desc'
      )
    }
    return CoworkValidate.insertValueIntoCoworkObject(sort, 'asc')
  }

  static async fetchAll(
    filters?: CoworkFilters,
    sort?: string,
    pagination?: { count?: number; cursor?: string }
  ): Promise<CoworkFull[]> {
    try {
      return await this._client.cowork.findMany({
        where: {
          ...this.$getCoworkFilterParameters(filters),
          address: this.$getAddressFilterParameters(filters)
        },
        orderBy: this.$getSortParameter(sort),
        include: {
          address: true,
          amenities: true,
          openSchedule: true
        }
      })
    } catch (err) {
      PrismaErrors.parseError(err, 'Coworks')
      CoworkValidate.parseError(err)
      if (err instanceof Error) throw err
    }
  }

  static async fetchById(id: string): Promise<CoworkFull> {
    try {
      return await this._client.cowork.findUniqueOrThrow({
        where: { id },
        include: {
          address: true,
          amenities: true,
          openSchedule: true
        }
      })
    } catch (err) {
      PrismaErrors.parseError(err, 'Cowork')
      if (err instanceof Error) throw err
    }
  }

  static async edit(id: string, data: EditCoworkInput): Promise<CoworkFull> {
    try {
      const parsedData = CoworkValidate.validateEdit(data)
      return await this._client.cowork.update({
        where: { id },
        data: {
          email: parsedData.email,
          name: parsedData.name,
          phone: parsedData.phone,
          address: {
            update: { ...parsedData.address }
          },
          amenities: {
            upsert: {
              update: { ...parsedData.amenities },
              create: { ...parsedData.amenities }
            }
          },
          openSchedule: {
            upsert: {
              update: { ...parsedData.openSchedule },
              create: { ...parsedData.openSchedule }
            }
          }
        },
        include: {
          address: true,
          openSchedule: true,
          amenities: true
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
