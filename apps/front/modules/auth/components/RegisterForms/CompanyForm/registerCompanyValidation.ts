import { z } from 'zod'

const company = z.object(
  {
    name: z.string().trim().min(1, { message: 'Company name is required' }),
    email: z.string().email().trim().min(1, { message: 'Email is required' })
  },
  { required_error: 'Company is required' }
)

export const registerAdminSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Must be a valid email' }),
  firstName: z.string().trim().min(1, { message: 'First name is required' }),
  lastName: z.string().trim().min(1, { message: 'Last name is required' }),
  company
})

export type RegisterAdminValidationSchema = z.infer<typeof registerAdminSchema>
