import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { CoworkCreateReq } from 'types'

import {
  CreateCoworkValidationSchema,
  createCoworkSchema
} from '@/modules/coworks/components/NewCoworkForm/newCoworkValidation'
import { FormError } from '@/common/components/FormError'
import { useApi } from '@/common/hooks/useApi'
import { ROUTES } from '@/common/routes'
import { COWORKS } from '../../constants'

export const NewCoworkForm = () => {
  const router = useRouter()
  const api = useApi()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateCoworkValidationSchema>({
    resolver: zodResolver(createCoworkSchema)
  })

  const createCowork = useMutation({
    // mutationKey: 'coworks',
    mutationFn: (coworkData: CoworkCreateReq) => api.post(COWORKS, coworkData),
    onSuccess: () => {
      queryClient.prefetchQuery({
        queryKey: [COWORKS]
      })
      router.push(ROUTES.SUPERADMIN_COWORKS_PATH)
    }
  })

  const onSubmit = (newCoworkData: CreateCoworkValidationSchema) =>
    createCowork.mutate(newCoworkData)

  return (
    <div className="flex justify-center pb-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-3xl flex-col gap-7"
      >
        <label className="flex flex-col">
          <p className="py-2">Name</p>
          <input className="p-2" {...register('name')} />
          <FormError error={errors.name} />
        </label>

        <label className="flex flex-col">
          <p className="py-2">Email</p>
          <input className="p-2" type="email" {...register('email')} />
          <FormError error={errors.email} />
        </label>

        <label className="flex flex-col">
          <p className="py-2">Description</p>
          <textarea className="p-2" {...register('description')} />
          <FormError error={errors.description} />
        </label>

        <label className="flex flex-col">
          <p className="py-2">Status</p>
          <select {...register('status')} defaultValue="PAUSED" className="p-2">
            <option value="ACTIVE">Active</option>
            <option value="PAUSED">Paused</option>
            <option value="CLOSED">Closed</option>
          </select>
          <FormError error={errors.name} />
        </label>

        <label className="flex flex-col">
          <p className="py-2">Phone number</p>
          <input className="p-2" {...register('phone')} type="tel" />
          <FormError error={errors.phone} />
        </label>
        <p className="text-lg">Address Information</p>

        <div className="flex w-full flex-col gap-6 md:flex-row">
          <label className="flex flex-col">
            <p className="py-2">Country</p>
            <input className="p-2" {...register('address.country')} />
            <FormError error={errors.address?.country} />
          </label>
          <label className="flex flex-col">
            <p className="py-2">City</p>
            <input className="p-2" {...register('address.city')} />
            <FormError error={errors.address?.city} />
          </label>
          <label className="flex flex-col">
            <p className="py-2">Street</p>
            <input className="p-2" {...register('address.streetName')} />
            <FormError error={errors.address?.streetName} />
          </label>
          <label className="flex flex-col">
            <p className="py-2">Number</p>
            <input className="p-2" {...register('address.number')} />
            <FormError error={errors.address?.number} />
          </label>
        </div>

        <div className="flex w-full flex-col gap-6 sm:flex-row">
          <label className="flex flex-col">
            <p className="py-2">Floor</p>
            <input className="p-2" {...register('address.floor')} />
            <FormError error={errors.address?.floor} />
          </label>
          <label className="flex flex-col">
            <p className="py-2">Apartment</p>
            <input className="p-2" {...register('address.apartment')} />
            <FormError error={errors.address?.apartment} />
          </label>
          <label className="flex flex-col">
            <p className="py-2">Postal Code</p>
            <input className="p-2" {...register('address.postalCode')} />
            <FormError error={errors.address?.postalCode} />
          </label>
        </div>

        <button
          type="submit"
          disabled={createCowork.isLoading}
          className="cursor-pointer rounded-md border-2 bg-gray-100 px-3 py-2 text-sm font-medium hover:bg-gray-200"
        >
          {createCowork.isLoading ? 'Creating cowork...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
