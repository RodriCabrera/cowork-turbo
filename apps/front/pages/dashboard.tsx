import { InferGetServerSidePropsType } from 'next'

import { bungeeHairline } from '@/common/styles/fonts'
import { DashboardLayout } from '@/common/Layout/ua/DashboardLayout'
import { getUserSession } from '@/common/utils/getAdminSession'
import { useFetchCompany } from '@/modules/dashboard/hooks/useFetchCompany'
import { EmployeeList } from '@/modules/dashboard/components/EmployeeList'

export const AdminDashboardPage = ({
  user
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { isCompanyLoading, companyData } = useFetchCompany(user)

  return (
    <DashboardLayout
      nameInitial={user?.firstName ? user.firstName[0] : ''}
      token={user?.access_token}
    >
      <p className={`pt-6 text-3xl ${bungeeHairline.className}`}>
        Employee List
      </p>
      <EmployeeList
        employees={companyData?.data.employees}
        isLoading={isCompanyLoading}
      />
    </DashboardLayout>
  )
}

export const getServerSideProps = getUserSession

export default AdminDashboardPage
