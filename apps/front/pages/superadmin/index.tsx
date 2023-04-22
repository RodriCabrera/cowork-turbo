import React, { ReactElement } from 'react'

import { SuperadminLayout } from '@/components/superadmin/SuperadminLayout'
import SuperadminLogin from '@/components/superadmin/SuperadminLogin'

export const Login = () => {
  return (
    <div>
      <SuperadminLogin />
    </div>
  )
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <SuperadminLayout>{page}</SuperadminLayout>
}

export default Login
