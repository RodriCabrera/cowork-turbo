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
