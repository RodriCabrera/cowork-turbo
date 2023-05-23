// TODO: Protected page

import { bungee } from '@/common/styles/fonts'
import { PropsWithAdmin } from '@/common/types'
import { withSessionSsr } from '@/modules/auth/utils/withSession'
import Link from 'next/link'

export const AdminDashboardPage = ({ admin }: PropsWithAdmin) => {
  return (
    <div>
      <Link href="/api/logout" className=" border-2 bg-red-300">
        Sign out
      </Link>
      <p className={`p-6 text-3xl ${bungee.className}`}>Dashboard</p>
      <p className="p-6">{admin?.email}</p>
      <p className="p-6">{admin?.firstName}</p>
    </div>
  )
}

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  return {
    props: { admin: req.session.admin }
  }
})

export default AdminDashboardPage
