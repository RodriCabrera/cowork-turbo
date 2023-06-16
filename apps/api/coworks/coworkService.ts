import { PrismaClient, Cowork, Prisma } from '@prisma/client'
import PrismaErrors from '../errors/prismaErrors'
import {
  EditCoworkInput,
  CreateCoworkInput,
  CoworkFull,
  CoworkFilters,
  PaginatedCoworks
} from './coworkTypes'
import CoworkValidate from './coworkValidation'

export default class CoworkService {
  private static _client = new PrismaClient()

  static async createCowork(
    data: CreateCoworkInput,
    author: string
  ): Promise<Cowork | undefined> {
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
          image: parsedData.image,
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

  private static $getSortParameter(sort?: string) {
    if (!sort) return {}
    if (sort[0] === '-') {
      return CoworkValidate.insertValueIntoCoworkObject(
        sort.substring(1),
        'desc'
      )
    }
    return CoworkValidate.insertValueIntoCoworkObject(sort, 'asc')
  }

  private static async $paginateByCursor(
    queryOptions: Prisma.CoworkFindManyArgs,
    cursor?: string
  ) {
    queryOptions.skip = cursor ? 1 : 0
    if (cursor) queryOptions.cursor = { id: cursor }
    const results = (await this._client.cowork.findMany(
      queryOptions
    )) as CoworkFull[]
    return {
      results,
      cursor: results[results.length - 1]?.id || undefined,
      page: undefined,
      totalPages: undefined
    }
  }

  private static async $paginateAbsolutely(
    queryOptions: Prisma.CoworkFindManyArgs,
    page: number
  ) {
    queryOptions.skip = (queryOptions.take || 10) * (page - 1)
    const count = await this._client.cowork.count({
      where: queryOptions.where
    })
    const totalPages = Math.ceil(count / (queryOptions.take || 10))
    const results = (await this._client.cowork.findMany(
      queryOptions
    )) as CoworkFull[]
    return {
      results,
      cursor: undefined,
      page: page.toString(),
      totalPages: totalPages.toString()
    }
  }

  static async fetchAll(
    filters?: CoworkFilters,
    sort?: string,
    pagination?: { count?: number; cursor?: string; page?: number }
  ): Promise<PaginatedCoworks | undefined> {
    try {
      const queryOptions = {
        take: pagination?.count || 10,
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
      }
      if (pagination?.page) {
        return this.$paginateAbsolutely(queryOptions, pagination.page)
      } else return this.$paginateByCursor(queryOptions, pagination?.cursor)
    } catch (err) {
      PrismaErrors.parseError(err, 'Coworks')
      CoworkValidate.parseError(err)
      if (err instanceof Error) throw err
    }
  }

  static async fetchById(id: string): Promise<CoworkFull | undefined> {
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

  static async edit(
    id: string,
    data: EditCoworkInput
  ): Promise<CoworkFull | undefined> {
    try {
      const parsedData = CoworkValidate.validateEdit(data)
      return await this._client.cowork.update({
        where: { id },
        data: {
          email: parsedData.email,
          name: parsedData.name,
          phone: parsedData.phone,
          image: parsedData.image,
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

  static async delete(id: string): Promise<boolean | undefined> {
    try {
      return !!(await this._client.cowork.delete({ where: { id } }))
    } catch (err) {
      PrismaErrors.parseError(err, 'Cowork')
      if (err instanceof Error) throw err
    }
  }
}
