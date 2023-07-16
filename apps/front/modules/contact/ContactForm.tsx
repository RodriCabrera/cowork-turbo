import React, { FC } from 'react'
import { ContactPostReq } from 'types'
import { useForm } from 'react-hook-form'
import { FormError } from '@/common/components/FormError'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// TODO: Extract to different file?
const inputSchema = z.object({
  message: z.string(),
  from: z.object({
    email: z.string().email(),
    name: z.string().min(3),
    companyName: z.string().optional(),
    phone: z.string().optional(),
    country: z.string()
  })
})

// TODO: styles
export const ContactForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ContactPostReq>({
    resolver: zodResolver(inputSchema)
  })

  // TODO: implement
  const onSubmit = () => null
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('from.email', { required: true })}
        />
        <FormError error={errors.from?.email} />
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register('from.name', { required: true })} />
        <FormError error={errors.from?.name} />
      </div>
      <div>
        <label htmlFor="company">Company</label>
        <input id="company" {...register('from.companyName')} />
        <FormError error={errors.from?.companyName} />
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <input id="phone" type="tel" {...register('from.phone')} />
        <FormError error={errors.from?.phone} />
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <input id="country" {...register('from.country')} />
        <FormError error={errors.from?.country} />
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea id="message" {...register('message')} />
        <FormError error={errors.message} />
      </div>
    </form>
  )
}
