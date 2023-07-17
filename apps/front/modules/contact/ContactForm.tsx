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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col justify-center sm:w-1/2"
    >
      <div className="m-auto my-4 flex w-full justify-center gap-6">
        <div className="w-1/3">
          <label htmlFor="email">
            <p className="py-2">Email</p>
            <input
              id="email"
              type="email"
              {...register('from.email', { required: true })}
              className="w-full p-2"
            />
            <FormError error={errors.from?.email} />
          </label>
          <label htmlFor="name">
            <p className="py-2">Name</p>
            <input
              id="name"
              {...register('from.name', { required: true })}
              className="w-full p-2"
            />
            <FormError error={errors.from?.name} />
          </label>
          <label htmlFor="company">
            <p className="py-2">Company</p>
            <input
              id="company"
              {...register('from.companyName')}
              className="w-full p-2"
            />
            <FormError error={errors.from?.companyName} />
          </label>
          <label htmlFor="phone">
            <p className="py-2">Phone</p>
            <input
              id="phone"
              type="tel"
              {...register('from.phone')}
              className="w-full p-2"
            />
            <FormError error={errors.from?.phone} />
          </label>
          <label htmlFor="country">
            <p className="py-2">Country</p>
            <input
              id="country"
              {...register('from.country')}
              className="w-full p-2"
            />
            <FormError error={errors.from?.country} />
          </label>
        </div>
        <label htmlFor="message" className="grow">
          <p className="py-2">Message</p>
          <textarea
            id="message"
            {...register('message')}
            className="h-[calc(100%-2.5rem)] w-full resize-none p-2"
          />
          <FormError error={errors.message} />
        </label>
      </div>
      <button type="submit" className="my-1 w-full bg-green-300 py-2">
        Send
      </button>
    </form>
  )
}
