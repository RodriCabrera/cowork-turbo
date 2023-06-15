import React from 'react'
import { CoworkCard } from './CoworkCard'
import { useInfiniteCoworks } from '../hooks/useInfiniteCoworks'

export const CoworksGrid = () => {
  const { data, hasNextPage, fetchNextPage } = useInfiniteCoworks()
  return (
    <div className="flex flex-wrap gap-4">
      {data && data?.pages.map((page, index) =>
      <React.Fragment key={index}>
        {page.results?.map(cowork => <CoworkCard key={cowork.id} cowork={cowork} />)}
      </React.Fragment>)}
      {hasNextPage ? <button onClick={() => fetchNextPage()}>fetch more</button> : <p>No more coworks</p>}
    </div>
  )
}
