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
import { CreateAdminInput, PublicUser } from '../../apps/api/users/userTypes'
import {
  EmployeeInput,
  CompanyEditInput,
  CompanyGetById,
  CompanyGetAll
} from '../../apps/api/companies/companyTypes'
import { ErrorInterface } from '../../apps/api/errors/errorInterface'

export interface SuperAdminData {
  id: string
  name: string
  email: string
  token: string
  iat: string
}

// TODO: Replace with the corresponding package types interface
export interface AdminData {
  id: string
  firstName: string
  lastName: string
  email: string
  token: string
  password: null
  role: string
  companyId: string
  isValidated: boolean
  isActive: boolean
  iat: number
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
export type UserAdminCreateReq = CreateAdminInput
export type EmployeeAddReq = EmployeeInput[]
export type CompanyEditReq = CompanyEditInput
export type CompanyGetOneRes = CompanyGetById
export type CompanyGetRes = CompanyGetAll
export type UserGetRes = PublicUser

// Returns type of elements of typed Array -> ie: ArrayType<CoworkFull[]> = CoworkFull
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never
