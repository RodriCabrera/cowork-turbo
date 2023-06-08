import { InferGetServerSidePropsType } from 'next'
import { useForm } from 'react-hook-form'

import { DashboardLayout } from '@/common/Layout/ua/DashboardLayout'
import { getUserSession } from '@/common/utils/getAdminSession'
import { useFetchCompany } from '@/modules/dashboard/hooks/useFetchCompany'
import { useFetchCredits } from '@/modules/dashboard/hooks/useFetchCredits'

export const AdminDashboardPage = ({
  user
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { companyData } = useFetchCompany(user)
  const { creditsData } = useFetchCredits(user, companyData?.data.Wallet.id)
  const credits = creditsData?.data.credits

  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    // POST CREDITS TO /credits
    console.log(data)
  }

  return (
    <DashboardLayout
      nameInitial={user?.firstName ? user.firstName[0] : 'B'}
      token={user?.access_token}
    >
      <div className="flex flex-col gap-6">
        <p className={'pt-6 text-3xl'}>You have {credits} credits.</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-xl flex-col gap-7"
        >
          <label className="flex flex-col gap-4">
            <p className="py-2">Add credits:</p>
            <input
              type="number"
              className="rounded-md border-2 border-gray-300 p-2"
              {...register('credits')}
              placeholder="Credits quantity"
            />
          </label>
          <button className="rounded-md bg-green-500 p-2 text-white">
            Confirm
          </button>
        </form>
      </div>
    </DashboardLayout>
  )
}

export const getServerSideProps = getUserSession

export default AdminDashboardPage
