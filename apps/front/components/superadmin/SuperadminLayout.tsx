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
      {children}
    </>
  )
}
