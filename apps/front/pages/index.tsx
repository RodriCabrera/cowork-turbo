import Image from 'next/image'

import { CompanyBanner } from '@/modules/landing/banners/CompanyBanner'
import { bungeeHairline } from '@/common/styles/fonts'
import { getUserSession } from '@/common/utils/getAdminSession'
import { BaseLayout } from '@/common/Layout/BaseLayout'
import { PropsWithUser } from '@/common/types'

const LandingPage = ({ user }: PropsWithUser) => {
  return (
    <BaseLayout user={user}>
      <div className="flex min-h-[calc(100vh-126px)] w-full flex-col items-center pb-20 md:p-0">
        <div className="max-w-7xl">
          <CompanyBanner />
          <div className="flex h-min flex-col items-center md:flex-row">
            <Image
              alt="illustration"
              src="/illustration.gif"
              className="h-auto w-auto object-cover brightness-110 grayscale"
              priority
              width={600}
              height={600}
            />
            <div className="flex max-w-2xl flex-col gap-4 p-6 text-center text-3xl md:text-left">
              <p className={`${bungeeHairline.className}`}>
                Experience work without limits
              </p>
              <p className=" text-2xl font-extralight">
                BaseBloom is here to bring spaces together so you can make your
                ideas flourish anywhere.
              </p>
              <p className={`${bungeeHairline.className}`}>
                The decision is up to you
              </p>
              <p className="mb-4 text-2xl font-extralight">
                You decide when you want to go, to which cowork, and how many
                credits to charge to your BaseBloom account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export const getServerSideProps = getUserSession

export default LandingPage
