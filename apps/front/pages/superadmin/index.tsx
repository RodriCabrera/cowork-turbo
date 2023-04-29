import React, { ReactElement } from 'react'

import { SuperadminLayout } from '@/components/superadmin/SuperadminLayout'
import { withSessionSsr } from '@/lib/withSession'
import { Login } from '../../components/Login'

export const SuperadminLoginPage = () => <Login endpoint="superadmins/login" />

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

SuperadminLoginPage.getLayout = function getLayout(page: ReactElement) {
  return <SuperadminLayout>{page}</SuperadminLayout>
}

export default SuperadminLoginPage
