import { z } from 'zod'

export const createCoworkSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Must be a valid email' }),
  name: z.string().min(1, { message: 'Name is required' }),
  phone: z.string().min(1, { message: 'Phone is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  status: z
    .enum(['ACTIVE', 'PAUSED', 'CLOSED'], {
      invalid_type_error: 'Status must be ACTIVE, PAUSED or CLOSED'
    })
    .optional(),
  address: z.object(
    {
      country: z.string().min(1, { message: 'Country is required' }),
      city: z.string().min(1, { message: 'City is required' }),
      streetName: z.string().min(1, { message: 'Street name is required' }),
      number: z.string().min(1, { message: 'Street number is required' }),
      floor: z.string().optional(),
      apartment: z.string().optional(),
      postalCode: z.string().optional()
    },
    { required_error: 'Address is required' }
  )
})

export type CreateCoworkValidationSchema = z.infer<typeof createCoworkSchema>
