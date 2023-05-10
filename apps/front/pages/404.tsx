import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

const NotFoundPage = () => {
  const router = useRouter()

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6">
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
  )
}

NotFoundPage.getLayout = (page: ReactElement) => page

export default NotFoundPage
