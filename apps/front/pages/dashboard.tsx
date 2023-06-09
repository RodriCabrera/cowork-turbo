import { InferGetServerSidePropsType } from 'next'

import { bungeeHairline } from '@/common/styles/fonts'
import { DashboardLayout } from '@/common/Layout/ua/DashboardLayout'
import { PeopleList } from '@/modules/dashboard/components/PeopleList'
import { getUserSession } from '@/common/utils/getAdminSession'
import { useFetchCompany } from '@/modules/dashboard/hooks/useFetchCompany'

export const AdminDashboardPage = ({
  user
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { isCompanyLoading, companyData } = useFetchCompany(user)

  return (
    <DashboardLayout
      nameInitial={user?.firstName ? user.firstName[0] : 'B'}
      token={user?.access_token}
    >
      <p className={`pt-6 text-3xl ${bungeeHairline.className}`}>People List</p>
      <PeopleList
        employees={companyData?.data.employees}
        isLoading={isCompanyLoading}
      />
    </DashboardLayout>
  )
}

export const getServerSideProps = getUserSession

export default AdminDashboardPage
