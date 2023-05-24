import Image from 'next/image'
import { useRouter } from 'next/router'

import { BaseLayout } from '@/common/Layout/BaseLayout'
import { PropsWithAdmin } from '@/common/types'

const NotFoundPage = ({ admin }: PropsWithAdmin) => {
  const router = useRouter()

  return (
    <BaseLayout admin={admin}>
      <div className="flex h-[calc(100vh-8rem)] w-full flex-col items-center justify-center gap-6">
        <h1 className="text-3xl">
          Page your are trying to access could not be found
        </h1>
        <Image
          alt="illustration"
          src="/plant.gif"
          className=" h-96 object-cover brightness-110 grayscale"
          width={500}
          height={500}
        />
        <button
          onClick={() => router.back()}
          className="rounded-md bg-slate-200 px-3 py-2 text-lg font-medium"
        >
          Go Back
        </button>
      </div>
    </BaseLayout>
  )
}

export default NotFoundPage
