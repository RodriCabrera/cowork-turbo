import { PropsWithChildren } from 'react'

import { SuperadminNavbar } from './SuperadminNavbar'
import { PropsWithUser } from 'types'

export const SuperadminLayout = ({
  children,
  user
}: PropsWithChildren<PropsWithUser>) => {
  return (
    <>
      <SuperadminNavbar user={user} />
      <div className="mx-auto max-w-7xl px-2 pt-8 sm:px-6 lg:px-8">
        {children}
      </div>
    </>
  )
}
