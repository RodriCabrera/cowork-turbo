import { BaseLayout } from '@/common/Layout/BaseLayout'
import { PropsWithUser } from '@/common/types'
import { getUserSession } from '@/common/utils/getAdminSession'
import { AboutBanner } from '@/modules/landing/banners/AboutBanner'

const AboutPage = ({ user }: PropsWithUser) => (
  <BaseLayout user={user}>
    <div className="flex min-h-[calc(100vh-126px)] justify-center bg-gray-50 pb-20 md:p-0">
      <AboutBanner />
    </div>
  </BaseLayout>
)

export const getServerSideProps = getUserSession

export default AboutPage
