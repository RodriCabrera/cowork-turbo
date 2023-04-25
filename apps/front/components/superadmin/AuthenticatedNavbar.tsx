import Link from 'next/link'
import React from 'react'

import { PropsWithUser } from 'types'

export const AuthenticatedNavbar = ({ user }: PropsWithUser) => {
  return (
    <div className="flex gap-10">
      <p>{user?.name}</p>
      <Link href="/api/superadmin/logout">Logout</Link>
    </div>
  )
}
