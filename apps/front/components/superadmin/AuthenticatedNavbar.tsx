import Link from 'next/link'

import { PropsWithUser } from 'types'

export const AuthenticatedNavbar = ({ user }: PropsWithUser) => {
  return (
    <div className="flex gap-10">
      <Link href="/api/superadmin/logout">Logout</Link>
    </div>
  )
}
