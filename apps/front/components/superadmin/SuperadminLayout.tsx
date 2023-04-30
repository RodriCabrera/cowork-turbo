import { PropsWithChildren } from 'react'

import { PropsWithSuperadmin } from 'types'

import { SuperadminNavbar } from './SuperadminNavbar'

export const SuperadminLayout = ({
  children,
  superadmin
}: PropsWithChildren<PropsWithSuperadmin>) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SuperadminNavbar superadmin={superadmin} />
      <main className="mx-auto max-w-7xl px-2 pt-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
