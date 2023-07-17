import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { z } from 'zod'
import { toast } from 'sonner'

import { useApi } from '@/common/hooks/useApi'
import { FormError } from '@/common/components/FormError'
import { zodResolver } from '@hookform/resolvers/zod'
import { ROUTES } from '@/common/routes'

import { ContactPostReq } from 'types'

// TODO: Extract to different file?
const inputSchema = z.object({
  message: z.string().min(1, { message: 'required' }),
  from: z.object({
    email: z.string().email(),
    name: z.string().min(3, { message: 'required' }),
    companyName: z.string().optional(),
    phone: z.string().optional(),
    country: z.string()
  })
})

export const ContactForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    resetField
  } = useForm<ContactPostReq>({
    resolver: zodResolver(inputSchema)
  })

  const api = useApi()

  const submitContact = useMutation({
    mutationKey: 'contact',
    mutationFn: (data: ContactPostReq) => api.post(ROUTES.CONTACT_PATH, data),
    onSuccess: () => {
      toast.success('Message sent')
      resetField('message')
    },
    onError: () => {
      toast.error('Message failed to send')
    }
  })

  const onSubmit = (contactData: ContactPostReq) =>
    submitContact.mutate(contactData)

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
            {...register('message', { required: true })}
            className="h-[calc(100%-2.5rem)] w-full resize-none p-2"
          />
          <FormError error={errors.message} />
        </label>
      </div>
      <button
        type="submit"
        className="my-2 w-full bg-green-300 py-2 disabled:bg-gray-300"
        disabled={!isValid || submitContact.status === 'loading'}
      >
        Send
      </button>
    </form>
  )
}
