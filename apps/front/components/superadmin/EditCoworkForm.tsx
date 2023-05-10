import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'
import { FieldError, useForm } from 'react-hook-form'

import { CoworkEditReq } from 'types'

import { useApi } from '@/context/apiContext'
import { CoworkFull } from '@/../api/coworks/coworkTypes'

interface CoworkFormProps {
  data: CoworkFull
}

export const EditCoworkForm = ({ data }: CoworkFormProps) => {
  const router = useRouter()
  const api = useApi()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      ...data,
      openSchedule: {
        mon: '',
        tue: '',
        wed: '',
        thu: '',
        fri: '',
        sat: '',
        sun: ''
      }
    }
  })

  const editCowork = useMutation({
    mutationKey: 'coworks',
    mutationFn: (coworkData: CoworkEditReq) => {
      return api.put(`/coworks/${data.id}`, coworkData)
    },
    onSuccess: () => {
      queryClient.prefetchQuery({
        queryKey: ['coworks']
      })
      router.push('/superadmin/coworks')
    }
  })

  const onSubmit = (newCoworkData: CoworkEditReq) =>
    editCowork.mutate(newCoworkData)

  const renderFormError = (error?: FieldError) =>
    error?.message && (
      <p className="text-xs italic text-red-500">* {error.message}</p>
    )

  return (
    <div className="flex justify-center pb-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-3xl flex-col gap-7"
      >
        <p className="border-b-2 text-lg font-semibold">Basic Information</p>

        <label className="flex flex-col">
          <p className="py-2">Name</p>
          <input className="p-2" {...register('name')} />
          {renderFormError(errors.name)}
        </label>
        <label className="flex flex-col">
          <p className="py-2">Email</p>
          <input className="p-2" type="email" {...register('email')} />
          {renderFormError(errors.email)}
        </label>
        <label className="flex flex-col">
          <p className="py-2">Description</p>
          <textarea className="p-2" {...register('description')} />
          {renderFormError(errors.description)}
        </label>
        <label className="flex flex-col">
          <p className="py-2">Status</p>
          <select {...register('status')} defaultValue="PAUSED" className="p-2">
            <option value="ACTIVE">Active</option>
            <option value="PAUSED">Paused</option>
            <option value="CLOSED">Closed</option>
          </select>
          {renderFormError(errors.status)}
        </label>
        <label className="flex flex-col">
          <p className="py-2">Phone number</p>
          <input className="p-2" {...register('phone')} type="tel" />
          {renderFormError(errors.phone)}
        </label>

        <p className="border-b-2 text-lg font-semibold">Address Information</p>

        <div className="flex w-full flex-col gap-6 md:flex-row">
          <label className="flex flex-col">
            <p className="py-2">Country</p>
            <input className="p-2" {...register('address.country')} />
            {renderFormError(errors.address?.country)}
          </label>
          <label className="flex flex-col">
            <p className="py-2">City</p>
            <input className="p-2" {...register('address.city')} />
            {renderFormError(errors.address?.city)}
          </label>
          <label className="flex flex-col">
            <p className="py-2">Street</p>
            <input className="p-2" {...register('address.streetName')} />
            {renderFormError(errors.address?.streetName)}
          </label>
          <label className="flex flex-col">
            <p className="py-2">Number</p>
            <input className="p-2" {...register('address.number')} />
            {renderFormError(errors.address?.number)}
          </label>
        </div>
        <div className="flex w-full flex-col gap-6 sm:flex-row">
          <label className="flex flex-col">
            <p className="py-2">Floor</p>
            <input className="p-2" {...register('address.floor')} />
            {renderFormError(errors.address?.floor)}
          </label>
          <label className="flex flex-col">
            <p className="py-2">Apartment</p>
            <input className="p-2" {...register('address.apartment')} />
            {renderFormError(errors.address?.apartment)}
          </label>
          <label className="flex flex-col">
            <p className="py-2">Postal Code</p>
            <input className="p-2" {...register('address.postalCode')} />
            {renderFormError(errors.address?.postalCode)}
          </label>
        </div>

        <p className="border-b-2 text-lg font-semibold">Schedule</p>

        <div className="flex w-full flex-col gap-6 sm:flex-row">
          <label className="flex flex-col">
            <p className="py-2">Monday</p>
            <input className="p-2" {...register('openSchedule.mon')} />
          </label>
          <label className="flex flex-col">
            <p className="py-2">Tuesday</p>
            <input className="p-2" {...register('openSchedule.tue')} />
          </label>
          <label className="flex flex-col">
            <p className="py-2">Wednesday</p>
            <input className="p-2" {...register('openSchedule.wed')} />
          </label>
        </div>
        <div className="flex w-full flex-col gap-6 sm:flex-row">
          <label className="flex flex-col">
            <p className="py-2">Thursday</p>
            <input className="p-2" {...register('openSchedule.thu')} />
          </label>
          <label className="flex flex-col">
            <p className="py-2">Friday</p>
            <input className="p-2" {...register('openSchedule.fri')} />
          </label>
          <label className="flex flex-col">
            <p className="py-2">Saturday</p>
            <input className="p-2" {...register('openSchedule.sat')} />
          </label>
          <label className="flex flex-col">
            <p className="py-2">Sunday</p>
            <input className="p-2" {...register('openSchedule.sun')} />
          </label>
        </div>

        <p className="border-b-2 text-lg font-semibold">Amenities</p>
        <div className="flex w-full flex-col gap-6 sm:flex-row">
          <label className="flex flex-col">
            <p className="py-2">Bathrooms</p>
            <input
              className="p-2"
              type="number"
              {...register('amenities.bathrooms', {
                valueAsNumber: true
              })}
            />
          </label>

          <label className="flex items-center gap-6">
            <p className="py-2">Buffet</p>
            <input
              type="checkbox"
              className="p-2"
              {...register('amenities.buffet')}
            />
          </label>
          <label className="flex items-center gap-6">
            <p className="py-2">Wifi</p>
            <input
              type="checkbox"
              checked
              className="p-2"
              {...register('amenities.wifi')}
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={editCowork.isLoading}
          className="cursor-pointer rounded-md border-2 bg-gray-100 px-3 py-2 text-sm font-medium hover:bg-gray-200"
        >
          {editCowork.isLoading ? 'Creating cowork...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
