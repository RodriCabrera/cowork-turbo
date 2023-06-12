import { useState } from 'react'
import { InferGetServerSidePropsType } from 'next'

import { DashboardLayout } from '@/common/Layout/ua/DashboardLayout'
import { getUserSession } from '@/common/utils/getAdminSession'
import { useFetchCompany } from '@/modules/dashboard/hooks/useFetchCompany'
import Axios from '@/common/utils/axios'
import { Modal } from '@/common/components/Modal'
import { useMutateCredits } from '@/modules/dashboard/hooks/useMutateCredits'
import { useFetchCredits } from '@/modules/dashboard/hooks/useFetchCredits'

export const AdminDashboardPage = ({
  user
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [ammount, setAmmount] = useState(1)

  const { companyData } = useFetchCompany(user)
  const walletId = companyData?.data.Wallet.id
  const { creditsData, isLoading: isLoadingCredits } = useFetchCredits(
    user,
    walletId
  )

  const credits = creditsData?.credits

  const mutateCredits = useMutateCredits(
    Axios.getInstance(user?.access_token),
    walletId
  )

  return (
    <DashboardLayout
      nameInitial={user?.firstName ? user.firstName[0] : ''}
      token={user?.access_token}
    >
      <Modal
        isOpen={isModalOpen}
        close={() => setIsModalOpen(false)}
        confirm={() => {
          mutateCredits.mutate(ammount)
          setIsModalOpen(false)
        }}
        title="Add Credits"
        description={`Are you sure you want to add ${ammount} credits?`}
        body="If you are sure, click on the Confirm button, and we'll add the credits to your account, and get in touch with you."
        confirmButton="Confirm"
      />
      <div className="flex flex-col gap-6">
        <p className={'pt-6 text-3xl'}>
          {isLoadingCredits
            ? 'Loading credits...'
            : `You have ${credits} credits.`}
        </p>
        <div className="flex w-full max-w-xl flex-col gap-7">
          <label className="flex flex-col gap-4">
            <p className="py-2">Add credits:</p>
            <input
              type="number"
              min={1}
              className="rounded-md border-2 border-gray-300 p-2"
              name="ammount"
              value={ammount}
              placeholder="Credits quantity"
              onChange={(e) => setAmmount(parseInt(e.target.value))}
            />
          </label>
          <button
            className="rounded-md bg-green-500 p-2 text-white"
            onClick={() => setIsModalOpen((prev) => !prev)}
          >
            Confirm
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}

export const getServerSideProps = getUserSession

export default AdminDashboardPage
