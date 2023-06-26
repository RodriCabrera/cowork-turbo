import { SingleCoworkFullGetRes } from '@/../../packages/types'

export const CoworkCard = ({ cowork }: { cowork: SingleCoworkFullGetRes }) => {
  return (
    <div className=" h-80 w-80 cursor-pointer rounded-md bg-gray-50 p-2">
      <div className="h-60 w-full rounded-md bg-sky-100">
        <img
          className='w-full h-full object-cover'
          src={cowork.image || 'https:placehold.it/200x200'}
          alt={`${cowork.name} profile image`}
        />
      </div>
      <p>{cowork.name}</p>
      <p>{cowork.email}</p>
    </div>
  )
}
