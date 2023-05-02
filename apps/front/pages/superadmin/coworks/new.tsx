import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { PropsWithSuperadmin } from 'types'

import { SuperadminLayout } from '@/components/superadmin/SuperadminLayout'
import { getSuperAdminData } from '@/lib/superadmin'

export const NewCoworkPage = ({ superadmin }: PropsWithSuperadmin) => {
  const router = useRouter()

  const {
    register,
    handleSubmit
    // watch
    // formState: { errors }
  } = useForm()

  const onSubmit = (data: any) => {
    // eslint-disable-next-line no-console
    console.log(data)
  }

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
            <input className="p-2" {...register('name', { required: true })} />
          </label>

          <label className="flex flex-col">
            <p className="py-2">Email</p>
            <input className="p-2" type="email" {...register('email')} />
          </label>

          <label className="flex flex-col">
            <p className="py-2">Description</p>
            <textarea className="p-2" {...register('description')} />
          </label>

          <label className="flex flex-col">
            <p className="py-2">Status</p>
            <select
              {...register('status', { required: true })}
              defaultValue="PAUSED"
              className="p-2"
            >
              <option value="ACTIVE">Active</option>
              <option value="PAUSED">Paused</option>
              <option value="CLOSED">Closed</option>
            </select>
          </label>

          <label className="flex flex-col">
            <input className="p-2" {...register('phone')} type="tel" />
          </label>

          <input
            type="submit"
            className="cursor-pointer rounded-md border-2 bg-gray-100 px-3 py-2 text-sm font-medium hover:bg-gray-200"
          />
        </form>
      </div>
    </SuperadminLayout>
  )
}

export const getServerSideProps = getSuperAdminData

NewCoworkPage.getLayout = (page: ReactElement) => page

export default NewCoworkPage
