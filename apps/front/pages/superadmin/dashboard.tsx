import React, { ReactElement } from 'react'
import { withIronSessionSsr } from 'iron-session/next'

import { SuperadminLayout } from '@/components/superadmin/SuperadminLayout'
import { ironOptions } from '@/lib/config'
import { UserData } from 'types'

export const SuperadminDashboard = ({ user }: { user: UserData }) => {
  return (
    <main>
      <h1 className="text-center text-6xl  font-bold">SUPERADMIN DASHBOARD</h1>
      <p>USER ID: {user.id}</p>
      <p>USER MAIL: {user.mail}</p>
      <p>USER NAME: {user.name}</p>
      <p>Issued at: {user.iat}</p>
    </main>
  )
}

export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
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
}, ironOptions)

SuperadminDashboard.getLayout = function getLayout(page: ReactElement) {
  return <SuperadminLayout>{page}</SuperadminLayout>
}

export default SuperadminDashboard
