type SenderData = {
  email: string
  name: string
  companyName?: string
  country?: string
  phone?: string
}

export type BasicContactData = {
  from: SenderData
  message: string
}
