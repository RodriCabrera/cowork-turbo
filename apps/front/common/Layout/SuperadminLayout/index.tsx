import { PropsWithChildren } from 'react'

import { SuperadminNavbar } from './SuperadminNavbar'
import { PropsWithSuperadmin } from '@/common/types'
import { ApiProvider } from '@/common/api/context/apiContext'

export const SuperadminLayout = ({
  children,
  superadmin
}: PropsWithChildren<PropsWithSuperadmin>) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SuperadminNavbar superadmin={superadmin} />
      <main className="mx-auto max-w-7xl px-2 pt-8 sm:px-6 lg:px-8">
        <ApiProvider token={superadmin?.access_token}>{children}</ApiProvider>
      </main>
    </div>
  )
}
