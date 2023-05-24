import { NextPage } from 'next'
import Link from 'next/link'

import { DashboardLayout } from '@/common/Layout/ua/DashboardLayout'
import { getAdminSession } from '@/common/utils/getAdminSession'
import { PropsWithAdmin } from '@/common/types'

export const AddPeoplePage = ({ admin }: PropsWithAdmin) => {
  return (
    <DashboardLayout nameInitial={admin?.firstName[0]}>
      <Link href={'/dashboard'}>Back to dashboard</Link>
      <div>AddPeoplePage</div>
    </DashboardLayout>
  )
}

export const getServerSideProps = getAdminSession

AddPeoplePage.getLayout = (page: NextPage) => page

export default AddPeoplePage
