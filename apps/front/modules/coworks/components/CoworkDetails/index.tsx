import Image from 'next/image'

import { useFetchCoworkDetails } from '../../hooks/useFetchCoworkDetails'
import { COLORS_BY_STATUS } from '../CoworksTable/constants'
import { LoaderThreeDots } from '@/common/components/LoaderThreeDots'

export const CoworkDetails = ({ coworkId }: { coworkId: string }) => {
  // TODO: Handle status notifications
  // TODO: Implement skeleton loader
  const { coworkDetails, isLoading } = useFetchCoworkDetails(coworkId)

  return (
    <div className="m-8 flex flex-col items-center gap-2 md:gap-6">
      {isLoading ? (
        <LoaderThreeDots />
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
          </header>
          {/* DESCRIPTION */}
          <p className="mt-4">{coworkDetails?.description}</p>
          {/* AMENITIES */}
          <div className="flex gap-4">
            {[
              {
                id: 'bathroom',
                text: '🚻 Bathroom',
                accessor: coworkDetails?.amenities?.bathrooms
              },
              {
                id: 'buffet',
                text: '✅ Buffet',
                accessor: coworkDetails?.amenities?.buffet
              },
              {
                id: 'wifi',
                text: '✅ Wifi',
                accessor: coworkDetails?.amenities?.wifi
              }
            ].map((amenity) => {
              if (!amenity.accessor) return null
              return <p key={amenity.id}>{amenity.text}</p>
            })}
          </div>
          {/* SCHEDULE */}
          <div className="my-4">
            <p className="font-bold">Open schedule</p>
            {[
              { label: 'Mon', value: coworkDetails?.openSchedule?.mon },
              { label: 'Tue', value: coworkDetails?.openSchedule?.tue },
              { label: 'Wed', value: coworkDetails?.openSchedule?.wed },
              { label: 'Thu', value: coworkDetails?.openSchedule?.thu },
              { label: 'Fri', value: coworkDetails?.openSchedule?.fri },
              { label: 'Sat', value: coworkDetails?.openSchedule?.sat },
              { label: 'Sun', value: coworkDetails?.openSchedule?.sun }
            ].map((day) => {
              if (!day.value) return null
              return (
                <p key={day.label}>
                  {day.label}: {day.value}
                </p>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
