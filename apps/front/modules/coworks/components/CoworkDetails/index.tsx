import { useFetchCoworkDetails } from '../../hooks/useFetchCoworkDetails'

export const CoworkDetails = ({ coworkId }: { coworkId: string }) => {
  const { coworkDetails, isFetched } = useFetchCoworkDetails(coworkId)

  return (
    <div>
      <h2>CoworkDetails</h2>
      {/* TODO: Handle status notifications */}
      {!isFetched && <p>Could not fetch the data</p>}

      <p>id: {coworkDetails?.id}</p>
      <p>name :{coworkDetails?.name}</p>
      <p>description: {coworkDetails?.description}</p>
      <p>email: {coworkDetails?.email}</p>
      <p>phone: {coworkDetails?.phone}</p>

      <p>Amenities</p>
      <p>{coworkDetails?.amenities?.bathrooms}</p>
      <p>{coworkDetails?.email}</p>

      <p>Address</p>
      <p>country:{coworkDetails?.address.country}</p>
      <p>city: {coworkDetails?.address.city}</p>
    </div>
  )
}
