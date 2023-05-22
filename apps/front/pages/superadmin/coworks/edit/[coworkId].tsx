import { ReactElement } from 'react'

import { Cowork } from 'types'

import { SuperadminLayout } from '@/common/Layout/SuperadminLayout'
import { withSessionSsr } from '@/modules/auth/utils/withSession'
import { PropsWithSuperadmin } from '@/common/types'
import { EditCoworkForm } from '@/modules/coworks/components/EditCoworkForm'
import { CoworkFull } from '@/../api/coworks/coworkTypes'

const EditCowork = ({
  superadmin,
  coworkData
}: PropsWithSuperadmin<{ coworkData: CoworkFull }>) => {
  return (
    <SuperadminLayout superadmin={superadmin}>
      <div>
        <h1 className="mb-6 text-center text-2xl">Edit</h1>
        <EditCoworkForm data={coworkData} />
      </div>
    </SuperadminLayout>
  )
}

export const getServerSideProps = withSessionSsr(async (context) => {
  const { req, query } = context
  const { superadmin } = req.session
  const coworksRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/coworks/${query.coworkId}`
  )
  const coworkData: Cowork = await coworksRes.json()
  return {
    props: { superadmin, coworkData }
  }
})

EditCowork.getLayout = (page: ReactElement) => page

export default EditCowork
