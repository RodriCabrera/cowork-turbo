import type { Cowork, Address } from '@prisma/client'

export type EditCoworkInput = Pick<Cowork, 'email' | 'phone'> & {
  address: Omit<Address, 'id'>
}
