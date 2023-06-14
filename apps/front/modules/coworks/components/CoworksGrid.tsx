import React from 'react'
import { CoworkCard } from './CoworkCard'
import { useInfiniteCoworks } from '../hooks/useInfiniteCoworks'

export const CoworksGrid = () => {
  const { data } = useInfiniteCoworks()

  // console.log('coworks', coworks)

  return (
    <div className="flex flex-wrap gap-4">
      {/* {coworks?.map((c) => (
        <CoworkCard key={c.id} cowork={c} />
      ))} */}
    </div>
  )
}
