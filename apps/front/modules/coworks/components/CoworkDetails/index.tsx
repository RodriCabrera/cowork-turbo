import Image from 'next/image'

import { useFetchCoworkDetails } from '../../hooks/useFetchCoworkDetails'

export const CoworkDetails = ({ coworkId }: { coworkId: string }) => {
  // TODO: Handle status notifications
  // TODO: Implement skeleton loader
  const { coworkDetails, isLoading } = useFetchCoworkDetails(coworkId)

  return (
    <div className="m-8 flex min-h-[calc(100vh-8.1rem)] w-screen flex-col gap-2 md:gap-6">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div>
            <h1 className="text-center text-6xl font-bold">
              {coworkDetails?.name}
            </h1>
            <p className="mt-4 text-center">{coworkDetails?.description}</p>
            {/* Show status with color badge? */}
            <p className="font-bold">Status: {coworkDetails?.status}</p>
            {coworkDetails?.image && (
              <Image
                src={coworkDetails?.image}
                width={500}
                height={500}
                alt="Cowork image"
              />
            )}
          </div>
          <div className="my-4">
            <p className="font-bold">Address</p>
            <p>Country:{coworkDetails?.address.country}</p>
            <p>City: {coworkDetails?.address.city}</p>

            <p className="font-bold">Amenities</p>
            <p>
              {coworkDetails?.amenities?.bathrooms &&
                `✅ has ${coworkDetails?.amenities?.bathrooms} bathrooms`}
            </p>
            <p>{coworkDetails?.amenities?.buffet && '✅ Buffet'}</p>
            <p>{coworkDetails?.amenities?.wifi ? '✅ Wifi' : 'No Wifi'}</p>

            <p className="font-bold">Open schedule</p>
            <p>Mon: {coworkDetails?.openSchedule?.mon}</p>
            <p>Tue: {coworkDetails?.openSchedule?.tue}</p>
            <p>Wed: {coworkDetails?.openSchedule?.wed}</p>
            <p>Thu: {coworkDetails?.openSchedule?.thu}</p>
            <p>Fri: {coworkDetails?.openSchedule?.fri}</p>
            <p>Sat: {coworkDetails?.openSchedule?.sat}</p>
            <p>Sun: {coworkDetails?.openSchedule?.sun}</p>
          </div>
        </>
      )}
    </div>
  )
}
