import { AxiosError } from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'

import { UserAdminCreateReq } from 'types'

import { FormError } from '@/common/components/FormError'
import Axios from '@/common/api/axios'
import {
  RegisterFreelancerValidationSchema,
  registerFreelancerSchema
} from './registerFreelancerValidation'

export const FreelancerForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid, errors }
  } = useForm<RegisterFreelancerValidationSchema>({
    resolver: zodResolver(registerFreelancerSchema),
    defaultValues: { company: { email: '', name: '' } }
  })

  const api = Axios.getInstance()
  const formSubmitHandler = (data: RegisterFreelancerValidationSchema) => {
    const email = getValues('email')
    setValue('company.email', email)
    setValue('company.name', email)
    const newAdminData: UserAdminCreateReq = getValues()
    api
      .post('users/register/admin', newAdminData)
      .then(() => toast.success('Check your email to finish the registration!'))
      .catch((err: AxiosError) => toast.error(err.message))
  }

  return (
    <section className="mx-auto flex  w-full flex-col items-center justify-center px-6 ">
      <div className="w-full rounded-lg bg-white sm:max-w-md md:mt-0  xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(formSubmitHandler)}
          >
            {/* Admin email */}
            <div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="mb-2 block ">
                  Email
                </label>
                <input
                  {...register('email')}
                  className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 sm:text-sm lg:bg-gray-50"
                />
                <FormError error={errors.email} />
              </div>
            </div>
            {/* Admin First Name */}
            <div>
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName" className="mb-2 block ">
                  First name
                </label>
                <input
                  {...register('firstName')}
                  className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 sm:text-sm lg:bg-gray-50"
                />
                <FormError error={errors.firstName} />
              </div>
            </div>
            {/* Admin Last Name */}
            <div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lastName" className="mb-2 block ">
                  Last name
                </label>
                <input
                  {...register('lastName')}
                  className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 sm:text-sm lg:bg-gray-50"
                />
                <FormError error={errors.lastName} />
              </div>
            </div>
            <button
              type="submit"
              className={`w-full rounded-lg  px-5 py-2.5 text-center text-base font-light text-black focus:outline-none focus:ring-4 ${
                isValid
                  ? 'bg-emerald-100/75 hover:bg-emerald-200/75'
                  : 'bg-gray-100/75'
              }`}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
