import { ReactElement } from 'react'

import { SuperadminLayout } from '@/components/superadmin/SuperadminLayout'
import { withSessionSsr } from '@/lib/withSession'
import { PropsWithUser } from 'types'

export const SuperadminDashboard = ({ user }: PropsWithUser) => {
  return (
    <SuperadminLayout user={user}>
      <main>
        <h1 className="text-center text-6xl  font-bold">
          SUPERADMIN DASHBOARD
        </h1>
        <p>USER ID: {user?.id}</p>
        <p>USER MAIL: {user?.mail}</p>
        <p>USER NAME: {user?.name}</p>
        <p>Issued at: {user?.iat}</p>
      </main>
    </SuperadminLayout>
  )
}

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const { user } = req.session

  if (!user) {
    return {
      redirect: {
        destination: '/superadmin',
        permanent: false
      }
    }
  }

  return {
    props: { user }
  }
})

SuperadminDashboard.getLayout = function getLayout(page: ReactElement) {
  return page
}

export default SuperadminDashboard
