import { useRouter } from 'next/router'

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
        {/* TODO: REFACTOR WITH NEXT IMAGE */}
        <img
          className="h-full w-full object-cover"
          src={cowork.image || 'https:placehold.it/200x200'}
          alt={`${cowork.name} profile image`}
        />
      </div>
      <p>{cowork.name}</p>
      <p>{cowork.email}</p>
    </div>
  )
}
