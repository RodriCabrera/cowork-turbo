import { InferGetServerSidePropsType } from 'next'

import Axios from '@/common/api/axios'
import { DashboardLayout } from '@/common/Layout/DashboardLayout'
import { withSessionSsr } from '@/modules/auth/utils/withSession'
import { getCompany } from '@/modules/dashboard/api/queryFunctions'
import { AddEmployeesForm } from '@/modules/dashboard/components/AddEmployeesForm'

export const AddEmployeesPage = ({
  admin,
  employees
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <DashboardLayout
      nameInitial={admin?.firstName ? admin.firstName[0] : 'A'}
      token={admin?.access_token}
    >
      <AddEmployeesForm employees={employees} companyId={admin?.companyId} />
    </DashboardLayout>
  )
}

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const { session } = req

  const api = Axios.getInstance(session.user?.access_token)
  const res = await getCompany(api, session.user?.companyId)

  const {
    data: { employees }
  } = res

  const parsedEmployees = employees.map(
    ({ firstName, lastName, isActive, email }) => ({
      firstName: firstName || '',
      lastName: lastName || '',
      isActive,
      email
    })
  )

  return {
    props: {
      admin: session.user || null,
      employees: parsedEmployees
    }
  }
})

export default AddEmployeesPage
