import { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'

import { BaseLayout } from '@/common/Layout/BaseLayout'
import { getUserSession } from '@/common/utils/getAdminSession'
import { CoworkDetails } from '@/modules/coworks/components/CoworkDetails'

const CoworkDetailsPage = ({
  user
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const coworkId = router.query.id as string

  return (
    <BaseLayout user={user}>
      <CoworkDetails coworkId={coworkId} />
    </BaseLayout>
  )
}

export const getServerSideProps = getUserSession

export default CoworkDetailsPage
