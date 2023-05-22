import { ReactElement } from 'react'

import { SuperadminLayout } from '@/common/Layout/SuperadminLayout'
import { getSuperAdminData } from '@/common/utils/getSuperAdminData'
import { PropsWithSuperadmin } from '@/common/types'

export const UserManagementPage = ({ superadmin }: PropsWithSuperadmin) => {
  return (
    <SuperadminLayout superadmin={superadmin}>
      <main>
        <h1 className="mb-8 text-start text-5xl font-bold sm:text-6xl">
          USER MANAGEMENT
        </h1>
        <div>
          <p>USER ID: {superadmin?.id}</p>
          <p>USER MAIL: {superadmin?.mail}</p>
          <p>USER NAME: {superadmin?.name}</p>
          <p>token: {superadmin?.token}</p>
          <p>Issued at: {superadmin?.iat}</p>
        </div>
      </main>
    </SuperadminLayout>
  )
}

export const getServerSideProps = getSuperAdminData

UserManagementPage.getLayout = (page: ReactElement) => page

export default UserManagementPage
