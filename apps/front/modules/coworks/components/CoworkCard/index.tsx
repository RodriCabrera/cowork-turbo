import Image from 'next/image'
import Link from 'next/link'

import { SingleCoworkFullGetRes } from 'types'

import { ROUTES } from '@/common/routes'

const IMAGE_PLACEHOLDER_200 = 'https:placehold.it/200x200'

export const CoworkCard = ({ cowork }: { cowork: SingleCoworkFullGetRes }) => {
  return (
    <Link
      href={`${ROUTES.COWORKS_PATH}/${cowork.id}`}
      target="_blank"
      className=" h-80 w-80 cursor-pointer rounded-md bg-gray-50 p-2"
    >
      <div className="h-60 w-full rounded-md bg-sky-100">
        <Image
          className="h-full w-full object-cover"
          src={cowork.image || IMAGE_PLACEHOLDER_200}
          alt={`${cowork.name} profile image`}
          width={200}
          height={200}
        />
      </div>
      <p>{cowork.name}</p>
      <p>{cowork.email}</p>
    </Link>
  )
}
