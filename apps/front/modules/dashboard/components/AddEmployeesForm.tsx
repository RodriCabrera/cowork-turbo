import { useState } from 'react'
import { FiDelete } from 'react-icons/fi'
import { useRouter } from 'next/router'
import { useFieldArray, useForm } from 'react-hook-form'

import { EmployeeAddReq } from 'types'

import { ROUTES } from '@/common/routes'
import { bungee } from '@/common/styles/fonts'
import { Modal } from '@/common/components/Modal'
import { useApi } from '@/common/context/apiContext'
import { addEmployees } from '../endpoints'

interface AddEmployeesFormProps {
  employees: {
    firstName: string
    lastName: string
    email: string
    isActive: boolean
  }[]
  companyId: string | undefined
}

export const AddEmployeesForm = ({
  employees,
  companyId
}: AddEmployeesFormProps) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const router = useRouter()
  const api = useApi()

  const {
    control,
    register,
    handleSubmit,
    formState: { isDirty }
  } = useForm({
    defaultValues: {
      employees
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'employees'
  })

  const onSubmit = async ({
    employees
  }: {
    employees: {
      firstName: string
      lastName: string
      email: string
      isActive: boolean
    }[]
  }) => {
    const inactiveEmployees: EmployeeAddReq = employees
      .filter((employee) => !employee.isActive)
      .map((employee) => {
        const { isActive, ...rest } = employee
        return rest
      })
    const res = await addEmployees(api, companyId, inactiveEmployees)
    router.push(ROUTES.DASHBOARD_PATH)
    return res
  }

  const handleAddField = () =>
    append({ firstName: '', lastName: '', email: '', isActive: false })

  return (
    <>
      <button
        onClick={() =>
          isDirty
            ? setIsConfirmModalOpen(true)
            : router.push(ROUTES.DASHBOARD_PATH)
        }
        className="mb-6 text-gray-500"
      >
        Back to dashboard
      </button>

      <p className={`${bungee.className} my-2 text-2xl`}>Employee List</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-4xl flex-col"
      >
        <div className="flex w-full flex-col items-start">
          {fields.map((field, index) => (
            <label key={field.id} className="flex w-full items-center">
              <p className="font-bold">{index + 1}</p>
              <input
                placeholder="Name"
                className="m-2 rounded-md border-2 p-2"
                {...register(`employees.${index}.firstName`)}
                disabled={field.isActive}
              />
              <input
                placeholder="Last name"
                className="m-2 rounded-md border-2 p-2"
                {...register(`employees.${index}.lastName`)}
                disabled={field.isActive}
              />
              <input
                className="m-2 w-full rounded-md border-2 p-2"
                placeholder="Email"
                {...register(`employees.${index}.email`)}
                disabled={field.isActive}
              />
              {!field.isActive && (
                <button
                  onClick={() => remove(index)}
                  className="flex items-center gap-2 font-light text-red-600 hover:text-red-700"
                >
                  <FiDelete />
                  <p>Remove</p>
                </button>
              )}
            </label>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddField}
          className="w-full rounded-md border-white p-2 font-medium hover:bg-gray-100"
        >
          Add Row
        </button>

        <button
          type="submit"
          className="mt-4 rounded-md border-2 bg-emerald-100 p-2 disabled:border-0 disabled:bg-gray-200 disabled:text-gray-500 disabled:opacity-50"
          disabled={fields.length === employees.length}
        >
          Confirm employee list
        </button>
      </form>

      <Modal
        isOpen={isConfirmModalOpen}
        close={() => setIsConfirmModalOpen(false)}
        confirm={() => router.push(ROUTES.DASHBOARD_PATH)}
        title="Are you sure you want to go back?"
        description="If you exit this page without saving, the modifications to the employee list will be lost"
        body=""
        confirmButton={'Yes, go back'}
      />
    </>
  )
}
