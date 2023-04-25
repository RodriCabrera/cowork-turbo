import React, { ReactElement } from 'react'

import { SuperadminLayout } from '@/components/superadmin/SuperadminLayout'
import { SuperadminLogin } from '@/components/superadmin/SuperadminLogin'
import { withSessionSsr } from '@/lib/withSession'

export const Login = () => <SuperadminLogin />

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const { user } = req.session

  if (user) {
    return {
      redirect: {
        destination: '/superadmin/dashboard',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
})

Login.getLayout = function getLayout(page: ReactElement) {
  return <SuperadminLayout>{page}</SuperadminLayout>
}

export default Login
