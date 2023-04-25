import { ReactElement } from 'react'

import { SuperadminLayout } from '@/components/superadmin/SuperadminLayout'
import { PropsWithUser } from 'types'
import { protectSuperadminRoute } from '@/lib/protectSuperadminRoute'

export const UserManagement = ({ user }: PropsWithUser) => {
  return (
    <SuperadminLayout user={user}>
      <main>
        <h1 className="mb-8 text-start text-5xl font-bold sm:text-6xl">
          USER MANAGEMENT
        </h1>
        <div>
          <p>USER ID: {user?.id}</p>
          <p>USER MAIL: {user?.mail}</p>
          <p>USER NAME: {user?.name}</p>
          <p>Issued at: {user?.iat}</p>
        </div>
      </main>
    </SuperadminLayout>
  )
}

export const getServerSideProps = protectSuperadminRoute

UserManagement.getLayout = function getLayout(page: ReactElement) {
  return page
}

export default UserManagement
