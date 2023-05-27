import { useState } from 'react'
import { useRouter } from 'next/router'
import { FiDelete } from 'react-icons/fi'
import Axios from '@/common/utils/axios'
import { useFieldArray, useForm } from 'react-hook-form'

import { EmployeeAddReq } from 'types'

import { DashboardLayout } from '@/common/Layout/ua/DashboardLayout'
import { PropsWithAdmin } from '@/common/types'
import { withSessionSsr } from '@/modules/auth/utils/withSession'
import { addEmployees, getCompany } from '@/modules/dashboard/endpoints'
import { bungee } from '@/common/styles/fonts'
import { Modal } from '@/common/components/Modal'

export const AddPeoplePage = ({
  admin,
  employees
}: PropsWithAdmin<{ employees: EmployeeAddReq }>) => {
  const router = useRouter()
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const api = Axios.getInstance(admin?.access_token) // TODO: Check if should use api provider

  const {
    control,
    register,
    handleSubmit,
    formState: { isDirty }
  } = useForm({
    defaultValues: { employees }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'employees'
  })

  const onSubmit = async ({ employees }: { employees: EmployeeAddReq }) => {
    const res = await addEmployees(api, admin?.companyId, employees)
    return res
  }

  return (
    <DashboardLayout nameInitial={admin?.firstName[0]}>
      <Modal
        isOpen={isConfirmModalOpen}
        close={() => setIsConfirmModalOpen(false)}
        confirm={() => router.push('/dashboard')}
        title="Are you sure you want to go back?"
        description="If you exit this page without saving, the modifications to the employee list will be lost"
        body=""
        confirmButton={'Yes, go back'}
      />
      <button
        onClick={() =>
          isDirty ? setIsConfirmModalOpen(true) : router.push('/dashboard')
        }
        className="mb-6 text-gray-500"
      >
        Back to dashboard
      </button>

      <p className={`${bungee.className} my-2 text-2xl`}>Employee List</p>
      <div className="flex">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex  max-w-4xl flex-col items-center"
        >
          {fields.map((field, index) => (
            <label key={field.id} className="flex items-center">
              {index + 1}
              <input
                placeholder="Name"
                className="m-2 rounded-md border-2 p-2"
                {...register(`employees.${index}.firstName`)}
              />
              <input
                placeholder="Last name"
                className="m-2 rounded-md border-2 p-2"
                {...register(`employees.${index}.lastName`)}
              />
              <input
                className="m-2 rounded-md border-2 p-2"
                placeholder="Email"
                {...register(`employees.${index}.email`)}
              />
              <button
                onClick={() => remove(index)}
                className="flex items-center gap-2 font-light text-red-600 hover:text-red-700"
              >
                <FiDelete />
                <p>Remove</p>
              </button>
            </label>
          ))}

          <button
            type="button"
            onClick={() => append({ firstName: '', lastName: '', email: '' })}
            className="w-full max-w-lg rounded-md border-white p-2 font-medium hover:bg-gray-100"
          >
            Add field
          </button>

          <button
            type="submit"
            className="mt-4 max-w-xs rounded-md border-2 bg-emerald-100 p-2"
          >
            Confirm employee list
          </button>
        </form>
      </div>
    </DashboardLayout>
  )
}

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const { session } = req

  const api = Axios.getInstance(session.admin?.access_token)
  const res = await getCompany(api, session.admin?.companyId)

  const {
    data: { employees }
  } = res

  // const parsedEmployees = employees.map((e) => ({
  //   name: `${e.firstName} ${e.lastName}`,
  //   email: e.email
  // }))

  return {
    props: {
      admin: session.admin || null,
      employees
    }
  }
})

export default AddPeoplePage
