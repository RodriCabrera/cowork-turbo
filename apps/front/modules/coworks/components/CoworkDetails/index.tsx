import Image from 'next/image'

import { useFetchCoworkDetails } from '../../hooks/useFetchCoworkDetails'
import { COLORS_BY_STATUS } from '../CoworksTable/constants'

export const CoworkDetails = ({ coworkId }: { coworkId: string }) => {
  // TODO: Handle status notifications
  // TODO: Implement skeleton loader
  const { coworkDetails, isLoading } = useFetchCoworkDetails(coworkId)

  return (
    <div className="m-8 flex flex-col items-center gap-2 md:gap-6">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="md:w-3/4">
          <header>
            <div className="mb-2 flex items-center gap-4">
              <h1 className=" text-4xl font-bold">{coworkDetails?.name}</h1>
              {/* // TODO: MOVE STATUS BADGE TO COMMON COMPONENT */}
              <span
                className={`rounded-full  px-3 py-1 text-xs ${
                  coworkDetails && COLORS_BY_STATUS[coworkDetails?.status]
                }`}
              >
                {coworkDetails?.status}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <p>
                {coworkDetails?.address.city}, {coworkDetails?.address.country}
              </p>
            </div>
            <div className="mb-4 flex items-center gap-4">
              <p>
                {`${coworkDetails?.address.streetName} ${coworkDetails?.address.number}`}
              </p>
            </div>
            {coworkDetails?.image && (
              <Image
                src={coworkDetails?.image}
                width={500}
                height={500}
                alt="Cowork image"
              />
            )}
          </header>{' '}
          <div className="flex gap-4">
            <p>{coworkDetails?.amenities?.bathrooms && '🚻 Bathroom'}</p>
            <p>{coworkDetails?.amenities?.buffet && '✅ Buffet'}</p>
            <p>{coworkDetails?.amenities?.wifi ? '✅ Wifi' : 'No Wifi'}</p>
          </div>
          <p className="mt-4">{coworkDetails?.description}</p>
          <div className="my-4">
            <p className="font-bold">Amenities</p>

            <p className="font-bold">Open schedule</p>
            <p>Mon: {coworkDetails?.openSchedule?.mon}</p>
            <p>Tue: {coworkDetails?.openSchedule?.tue}</p>
            <p>Wed: {coworkDetails?.openSchedule?.wed}</p>
            <p>Thu: {coworkDetails?.openSchedule?.thu}</p>
            <p>Fri: {coworkDetails?.openSchedule?.fri}</p>
            <p>Sat: {coworkDetails?.openSchedule?.sat}</p>
            <p>Sun: {coworkDetails?.openSchedule?.sun}</p>
          </div>
        </div>
      )}
    </div>
  )
}
