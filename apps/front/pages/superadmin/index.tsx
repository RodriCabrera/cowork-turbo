import React, { ReactElement } from 'react'

import { SuperadminLayout } from '@/components/superadmin/SuperadminLayout'
import { withSessionSsr } from '@/lib/withSession'
import { Login } from '../../components/Login'

export const SuperadminLogin = () => <Login endpoint="superadmin/login" />

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const { user } = req.session

  if (user) {
    return {
      redirect: {
        destination: '/superadmin/coworks',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
})

SuperadminLogin.getLayout = function getLayout(page: ReactElement) {
  return <SuperadminLayout>{page}</SuperadminLayout>
}

export default SuperadminLogin
