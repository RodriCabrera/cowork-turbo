import { ReactElement } from 'react'
import { useRouter } from 'next/router'

import { PropsWithSuperadmin } from 'types'

import { SuperadminLayout } from '@/components/superadmin/SuperadminLayout'
import { getSuperAdminData } from '@/lib/superadmin'

export const NewCoworkPage = ({ superadmin }: PropsWithSuperadmin) => {
  const router = useRouter()
  return (
    <SuperadminLayout superadmin={superadmin}>
      <div>
        <button type="button" onClick={() => router.back()}>
          Click here to go back
        </button>
        <h1>NewCoworkPage</h1>
      </div>
    </SuperadminLayout>
  )
}

export const getServerSideProps = getSuperAdminData

NewCoworkPage.getLayout = (page: ReactElement) => page

export default NewCoworkPage
