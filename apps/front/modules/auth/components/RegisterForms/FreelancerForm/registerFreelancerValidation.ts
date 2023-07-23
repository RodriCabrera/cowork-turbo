import { z } from 'zod'

const company = z.object({
  name: z.string(),
  email: z.string().nullish()
})

export const registerFreelancerSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Must be a valid email' }),
  firstName: z.string().trim().min(1, { message: 'First name is required' }),
  lastName: z.string().trim().min(1, { message: 'Last name is required' }),
  company
})

export type RegisterFreelancerValidationSchema = z.infer<
  typeof registerFreelancerSchema
>
