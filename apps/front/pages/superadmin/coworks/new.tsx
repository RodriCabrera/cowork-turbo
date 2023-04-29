import { ReactElement } from 'react'
import { useRouter } from 'next/router'

import { PropsWithUser } from 'types'
import { SuperadminLayout } from '@/components/superadmin/SuperadminLayout'

export const NewCoworkPage = ({ user }: PropsWithUser) => {
  const router = useRouter()
  return (
    <SuperadminLayout user={user}>
      <div>
        <button type="button" onClick={() => router.back()}>
          Click here to go back
        </button>
        <h1>NewCoworkPage</h1>
      </div>
    </SuperadminLayout>
  )
}

NewCoworkPage.getLayout = function getLayout(page: ReactElement) {
  return page
}

export default NewCoworkPage
