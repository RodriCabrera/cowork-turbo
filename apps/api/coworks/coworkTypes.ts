import CoworkValidate from './coworkValidation'
import {
  Cowork,
  Address,
  CoworkAmenities,
  OpenSchedule,
  Status
} from '@prisma/client'
import { PaginatedResponse } from 'types'

const createSchema = CoworkValidate.getCreateSchema()
const editSchema = CoworkValidate.getEditSchema()

export type CreateCoworkInput = ReturnType<typeof createSchema.parse>
export type EditCoworkInput = ReturnType<typeof editSchema.parse>
export type CoworkFull = Cowork & {
  address: Address
  amenities: CoworkAmenities | null
  openSchedule: OpenSchedule | null
}

export type CoworkFilters = {
  status?: Status
  city?: Address['city']
  country?: Address['country']
}

export type PaginatedCoworks = PaginatedResponse<CoworkFull[]>
