import { InferGetServerSidePropsType } from 'next'

import { BaseLayout } from '@/common/Layout/BaseLayout'
import { getUserSession } from '@/common/utils/getAdminSession'
import { CoworksGrid } from '@/modules/coworks/components/CoworksGrid'

const CoworksPage = ({
  user
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <BaseLayout user={user}>
      <div className="mt-8 flex min-h-[calc(100vh-8.1rem)] w-screen flex-col items-center gap-2 md:gap-8">
        <div className="flex flex-col gap-6 p-4">
          <h1 className="text-center text-6xl font-bold">COWORKS</h1>
          <CoworksGrid />
        </div>
      </div>
    </BaseLayout>
  )
}

export const getServerSideProps = getUserSession

export default CoworksPage
