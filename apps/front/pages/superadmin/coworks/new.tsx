import { ReactElement } from 'react'
import { useRouter } from 'next/router'

import { getSuperAdminData } from '@/lib/superadmin'
import { PropsWithSuperadmin } from '@/types/superadmin'
import { SuperadminLayout } from '@/components/superadmin/SuperadminLayout'
import { NewCoworkForm } from '@/components/superadmin/NewCoworkForm'

export const NewCoworkPage = ({ superadmin }: PropsWithSuperadmin) => {
  const router = useRouter()
  return (
    <SuperadminLayout superadmin={superadmin}>
      <div>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-md   px-3 py-2 text-sm font-medium hover:bg-gray-100"
        >
          Click here to go back
        </button>
      </div>

      <h1 className="mb-6 text-center text-2xl">
        Add a Cowork from the following form
      </h1>
      <div className="flex justify-center pb-4">
        <NewCoworkForm />
      </div>
    </SuperadminLayout>
  )
}

export const getServerSideProps = getSuperAdminData

NewCoworkPage.getLayout = (page: ReactElement) => page

export default NewCoworkPage
