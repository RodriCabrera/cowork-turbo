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
      <label htmlFor="email">
        <p>Email</p>
        <input
          id="email"
          type="email"
          {...register('from.email', { required: true })}
        />
        <FormError error={errors.from?.email} />
      </label>
      <label htmlFor="name">
        <p>Name</p>
        <input id="name" {...register('from.name', { required: true })} />
        <FormError error={errors.from?.name} />
      </label>

      <label htmlFor="company">
        <p>Company</p>
        <input id="company" {...register('from.companyName')} />
        <FormError error={errors.from?.companyName} />
      </label>

      <label htmlFor="phone">
        <p>Phone</p>
        <input id="phone" type="tel" {...register('from.phone')} />
        <FormError error={errors.from?.phone} />
      </label>

      <label htmlFor="country">
        <p>Country</p>
        <input id="country" {...register('from.country')} />
        <FormError error={errors.from?.country} />
      </label>

      <label htmlFor="message">
        <p>Message</p>
        <textarea id="message" {...register('message')} />
        <FormError error={errors.message} />
      </label>
    </form>
  )
}
