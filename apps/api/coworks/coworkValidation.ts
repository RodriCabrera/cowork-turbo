import { z, ZodError } from 'zod'
import CustomError, { ERROR_CODES } from '../errors/customError'

export default class CoworkValidate {
  private static $statusEnumValues = ['ACTIVE', 'PAUSED', 'CLOSED'] as const

  private static $baseCoworkSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    phone: z.string(),
    description: z.string(),
    status: z.enum(this.$statusEnumValues).optional()
  })

  private static $addressSchema = z.object({
    country: z.string(),
    city: z.string(),
    streetName: z.string(),
    number: z.string(),
    floor: z.string().optional(),
    apartment: z.string().optional(),
    postalCode: z.string().optional()
  })

  private static $openScheduleSchema = z.object({
    mon: z.string().optional(),
    tue: z.string().optional(),
    wed: z.string().optional(),
    thu: z.string().optional(),
    fri: z.string().optional(),
    sat: z.string().optional(),
    sun: z.string().optional()
  })

  private static $amenitiesSchema = z.object({
    wifi: z.boolean().optional(),
    bathrooms: z.number().optional(),
    buffet: z.boolean().optional()
  })

  private static $createSchema = this.$baseCoworkSchema.extend({
    address: this.$addressSchema
  })

  private static $editSchema = this.$baseCoworkSchema.extend({
    amenities: this.$amenitiesSchema.optional(),
    openSchedule: this.$openScheduleSchema.optional(),
    address: this.$addressSchema.optional()
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
    return z.enum(this.$statusEnumValues).parse(status.toUpperCase())
  }

  static insertValueIntoCoworkObject(key: string, value: string): Object {
    if (Object.keys(this.$baseCoworkSchema.shape).includes(key)) {
      return { [key]: value }
    }
    if (Object.keys(this.$addressSchema.shape).includes(key)) {
      return {
        address: {
          [key]: value
        }
      }
    }
    return {}
  }
}
