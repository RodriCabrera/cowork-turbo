import CoworkValidate from './coworkValidation'
import { Cowork, Address, CoworkAmenities, OpenSchedule } from '@prisma/client'

const createSchema = CoworkValidate.getCreateSchema()
const editSchema = CoworkValidate.getEditSchema()

export type CreateCoworkInput = ReturnType<typeof createSchema.parse>
export type EditCoworkInput = ReturnType<typeof editSchema.parse>
export type CoworkFull = Cowork & {
  address: Address
  amenities?: CoworkAmenities
  openSchedule?: OpenSchedule
}

export type CoworkFilters = {
  status?: string
  city?: Address['city']
  country?: Address['country']
}
