/*
  Proposed naming style for api/web com types -> {
    1) Referenced model or type name
    2) Verb for the http method or similar (Post, Create, Delete)
    3) Req / Res to indicate type origin
  }
  ie: CoworkEditReq  => expected input type to edit (put request) a cowork
      CompanyCreateRes => return type on creating a company
*/

import {
  CreateCoworkInput,
  EditCoworkInput,
  CoworkFull
} from '../../apps/api/coworks/coworkTypes'
import { ErrorInterface } from '../../apps/api/errors/errorInterface'

export interface SuperAdminData {
  id: string
  name: string
  mail: string
  token: string
  iat: string
}

interface Address {
  apartment: string
  city: string
  country: string
  floor: string
  id: string
  number: string
  postalCode: string
  streetName: string
}

export interface Cowork {
  address: Address
  addressId: string
  email: string
  id: string
  name: string
  phone: string
  rating: number
}

export type PaginatedResponse<T> = {
  results: T
  cursor?: string
  page?: string
  totalPages?: string
}

export type CoworkCreateReq = CreateCoworkInput
export type CoworkEditReq = EditCoworkInput
export type SingleCoworkFullGetRes = CoworkFull
export type CoworkFullGetRes = PaginatedResponse<CoworkFull[]>
export type ErrorAllRes = ErrorInterface

// Returns type of elements of typed Array -> ie: ArrayType<CoworkFull[]> = CoworkFull
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never
