import { z, ZodError } from 'zod'
import CustomError, { ERROR_CODES } from '../errors/customError'

export default class CoworkValidate {
  private static $createSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    phone: z.string(),
    description: z.string(),
    status: z.enum(['ACTIVE', 'PAUSED', 'CLOSED']).optional(),
    address: z.object({
      country: z.string(),
      city: z.string(),
      streetName: z.string(),
      number: z.string(),
      floor: z.string().optional(),
      apartment: z.string().optional(),
      postalCode: z.string().optional()
    })
  })

  private static $editSchema = z.object({
    email: z.string().email().optional(),
    name: z.string().optional(),
    phone: z.string().optional(),
    description: z.string().optional(),
    status: z.enum(['ACTIVE', 'PAUSED', 'CLOSED']).optional(),
    amenities: z
      .object({
        wifi: z.boolean().optional(),
        bathrooms: z.number().optional(),
        buffet: z.boolean().optional()
      })
      .optional(),
    openSchedule: z
      .object({
        mon: z.string().optional(),
        tue: z.string().optional(),
        wed: z.string().optional(),
        thu: z.string().optional(),
        fri: z.string().optional(),
        sat: z.string().optional(),
        sun: z.string().optional()
      })
      .optional(),
    address: z
      .object({
        country: z.string().optional(),
        city: z.string().optional(),
        streetName: z.string().optional(),
        number: z.string().optional(),
        floor: z.string().optional(),
        apartment: z.string().optional(),
        postalCode: z.string().optional()
      })
      .optional()
  })

  static validateCreate(data: any) {
    return this.$createSchema.parse(data)
  }

  static getCreateSchema() {
    return this.$createSchema
  }

  static validateEdit(data: any) {
    return this.$editSchema.parse(data)
  }

  static getEditSchema() {
    return this.$editSchema
  }

  static parseError(error: unknown) {
    if (error instanceof ZodError) {
      throw new CustomError(error.message, 406, ERROR_CODES.ZodInvalidType)
    }
  }

  static validateStatus(status: string) {
    return z.enum(['ACTIVE', 'PAUSED', 'CLOSED']).parse(status.toUpperCase())
  }
}
