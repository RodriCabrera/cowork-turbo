import { PropsWithChildren } from 'react'

import { SuperadminNavbar } from './SuperadminNavbar'
import { PropsWithUser } from 'types'

export const SuperadminLayout = ({
  children,
  user
}: PropsWithChildren<PropsWithUser>) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SuperadminNavbar user={user} />
      <main className="mx-auto max-w-7xl px-2 pt-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
