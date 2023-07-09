import { InferGetServerSidePropsType } from 'next'

import { BaseLayout } from '@/common/Layout/BaseLayout'
import { bungeeHairline } from '@/common/styles/fonts'
import { getUserSession } from '@/common/utils/getAdminSession'
import { CoworksGrid } from '@/modules/coworks/components/CoworksGrid'

const CoworksPage = ({
  user
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <BaseLayout user={user}>
      <div className="flex min-h-[calc(100vh-8.1rem)] w-screen flex-col items-center gap-2 md:gap-8">
        <p className={`pt-6 text-3xl ${bungeeHairline.className}`}>Coworks</p>
        <CoworksGrid />
      </div>
    </BaseLayout>
  )
}

export const getServerSideProps = getUserSession

export default CoworksPage
