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
    floor: z.string().nullish(),
    apartment: z.string().nullish(),
    postalCode: z.string().nullish()
  })

  private static $openScheduleSchema = z.object({
    mon: z.string().nullish(),
    tue: z.string().nullish(),
    wed: z.string().nullish(),
    thu: z.string().nullish(),
    fri: z.string().nullish(),
    sat: z.string().nullish(),
    sun: z.string().nullish()
  })

  private static $amenitiesSchema = z.object({
    wifi: z.boolean().nullish(),
    bathrooms: z.number().nullish(),
    buffet: z.boolean().nullish()
  })

  private static $createSchema = this.$baseCoworkSchema.extend({
    address: this.$addressSchema
  })

  private static $editSchema = this.$baseCoworkSchema.extend({
    amenities: this.$amenitiesSchema.nullish(),
    openSchedule: this.$openScheduleSchema.nullish(),
    address: this.$addressSchema.nullish()
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
