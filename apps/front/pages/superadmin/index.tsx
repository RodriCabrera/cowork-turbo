import React, { ReactElement } from 'react'

import { SuperadminLayout } from '@/components/superadmin/SuperadminLayout'

export const Login = () => {
  return <div className="px-2 py-4 text-4xl md:text-5xl">Login</div>
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <SuperadminLayout>{page}</SuperadminLayout>
}

export default Login
