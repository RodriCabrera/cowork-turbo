import { useRouter } from 'next/router'
import Image from 'next/image'

import { SingleCoworkFullGetRes } from 'types'

import { ROUTES } from '@/common/routes'

export const CoworkCard = ({ cowork }: { cowork: SingleCoworkFullGetRes }) => {
  const router = useRouter()

  const handleCardClick = (id: string) => {
    router.push(`${ROUTES.COWORKS_PATH}/${id}`)
  }

  return (
    <div
      className=" h-80 w-80 cursor-pointer rounded-md bg-gray-50 p-2"
      onClick={() => handleCardClick(cowork.id)}
    >
      <div className="h-60 w-full rounded-md bg-sky-100">
        <Image
          className="h-full w-full object-cover"
          src={cowork.image || 'https:placehold.it/200x200'}
          alt={`${cowork.name} profile image`}
          width={200}
          height={200}
        />
      </div>
      <p>{cowork.name}</p>
      <p>{cowork.email}</p>
    </div>
  )
}
