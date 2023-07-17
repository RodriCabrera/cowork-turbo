import { useFetchCoworkDetails } from '../../hooks/useFetchCoworkDetails'

export const CoworkDetails = ({ coworkId }: { coworkId: string }) => {
  const { coworkDetails, isFetched } = useFetchCoworkDetails(coworkId)

  //  TODO: Handle status notifications

  return (
    <div className="m-8 flex min-h-[calc(100vh-8.1rem)] w-screen flex-col gap-2 md:gap-6">
      <h1 className="text-center text-6xl font-bold">{coworkDetails?.name}</h1>
      {!isFetched && <p>Could not fetch the data</p>}

      <p className="mt-4 text-center">{coworkDetails?.description}</p>
      <div className="my-4">
        <p>Email: {coworkDetails?.email}</p>
        <p>Phone: {coworkDetails?.phone}</p>

        <p>Amenities</p>
        <p>{coworkDetails?.amenities?.bathrooms}</p>
        <p>{coworkDetails?.email}</p>

        <p>Address</p>
        <p>Country:{coworkDetails?.address.country}</p>
        <p>City: {coworkDetails?.address.city}</p>
      </div>
    </div>
  )
}
