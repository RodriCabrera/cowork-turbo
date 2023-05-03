/*
  Proposed naming style for api/web com types -> {
    1) first letter indicates if its input or output (I/O)
    2) Referenced model or type name
    3) Verb for the http method or similar (Post, Create, Delete)
  }
  ie: ICoworkEdit  => expected input type to edit (put request) a cowork
      OCompanyCreate => return type on creating a company
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

export type ICoworkCreate = CreateCoworkInput
export type ICoworkEdit = EditCoworkInput
export type OCoworkGetFull = CoworkFull
export type OErrorAll = ErrorInterface
