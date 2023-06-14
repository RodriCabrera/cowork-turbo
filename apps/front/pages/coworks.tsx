import { InferGetServerSidePropsType } from 'next'

import { BaseLayout } from '@/common/Layout/BaseLayout'
import { bungeeHairline } from '@/common/styles/fonts'
import { getUserSession } from '@/common/utils/getAdminSession'
import { ApiProvider } from '@/common/context/apiContext'
import { CoworksGrid } from '@/modules/coworks/components/CoworksGrid'

const CoworksPage = ({
  user
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <BaseLayout user={user}>
      <div className="flex min-h-[calc(100vh-8.1rem)] w-screen flex-col items-center justify-center gap-2 md:gap-8">
        <p className={`pt-6 text-3xl ${bungeeHairline.className}`}>Coworks</p>
        <ApiProvider token={user?.access_token}>
          <CoworksGrid />
        </ApiProvider>
      </div>
    </BaseLayout>
  )
}

export const getServerSideProps = getUserSession

export default CoworksPage
