import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { useForm, FieldError } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { zodResolver } from '@hookform/resolvers/zod'

import { SuperadminLayout } from '@/components/superadmin/SuperadminLayout'
import { getSuperAdminData } from '@/lib/superadmin'
import { PropsWithSuperadmin } from '@/types/superadmin'
import { CoworkCreateReq } from 'types'
import Axios from '@/lib/axios'

import { createCoworkSchema, CreateCoworkValidationSchema } from '../../../validators/newCoworkValidation'

export const NewCoworkPage = ({ superadmin }: PropsWithSuperadmin) => {
  const router = useRouter()

  const axios = Axios.getInstance(superadmin?.access_token)
  const queryClient = useQueryClient()

  const createCowork = useMutation({
    mutationKey: 'coworks',
    // * Pass validation schema type to submit function & API type to mutation call to make any mismatch self evident (?)
    mutationFn: (newCoworkData: CoworkCreateReq) => {
      return axios.post('/coworks', newCoworkData)
    },
    onSuccess: () => {
      queryClient.prefetchQuery({
        queryKey: ['coworks']
      })
      router.push('/superadmin/coworks')
    }
  })

  const { register, handleSubmit, formState: { errors } } = useForm<CreateCoworkValidationSchema>({ resolver: zodResolver(createCoworkSchema) })

  // * Pass validation schema type to submit function & API type to mutation call to make any mismatch self evident (?)
  const onSubmit = (newCoworkData: CreateCoworkValidationSchema) => createCowork.mutate(newCoworkData)

  const renderFormError = (error?: FieldError) => (
    error?.message && <p className='text-xs italic text-red-500'>* {error.message}</p>)

  return (
    <SuperadminLayout superadmin={superadmin}>
      <div>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-md   px-3 py-2 text-sm font-medium hover:bg-gray-100"
        >
          Click here to go back
        </button>
      </div>

      <h1 className="mb-6 text-center text-2xl">
        Add a Cowork from the following form
      </h1>

      <div className="flex justify-center pb-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-3xl flex-col gap-7"
        >
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
            <select
              {...register('status')}
              defaultValue="PAUSED"
              className="p-2"
            >
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
          <p className="text-lg">Address Information</p>

          <div className="flex w-full flex-col gap-6 md:flex-row">
            <label className="flex flex-col">
              <p className="py-2">Country</p>
              <input
                className="p-2"
                {...register('address.country')}
              />
              {renderFormError(errors.address?.country)}
            </label>
            <label className="flex flex-col">
              <p className="py-2">City</p>
              <input
                className="p-2"
                {...register('address.city')}
              />
              {renderFormError(errors.address?.city)}
            </label>
            <label className="flex flex-col">
              <p className="py-2">Street</p>
              <input
                className="p-2"
                {...register('address.streetName')}
              />
              {renderFormError(errors.address?.streetName)}
            </label>
            <label className="flex flex-col">
              <p className="py-2">Number</p>
              <input
                className="p-2"
                {...register('address.number')}
              />
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
              <input
                className="p-2"
                {...register('address.apartment')}
              />
              {renderFormError(errors.address?.apartment)}
            </label>
            <label className="flex flex-col">
              <p className="py-2">Postal Code</p>
              <input className="p-2" {...register('address.postalCode')} />
              {renderFormError(errors.address?.postalCode)}
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
    </SuperadminLayout>
  )
}

export const getServerSideProps = getSuperAdminData

NewCoworkPage.getLayout = (page: ReactElement) => page

export default NewCoworkPage
