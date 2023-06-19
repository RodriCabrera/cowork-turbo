import React from 'react'

import { CoworkCard } from './CoworkCard'
import { useInfiniteCoworks } from '../hooks/useInfiniteCoworks'

export const CoworksGrid = () => {
  const { data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } =
    useInfiniteCoworks()

  return (
    <>
      <div className="flex w-2/3 flex-wrap gap-4 pb-12">
        {data &&
          data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.results?.map((cowork) => (
                <CoworkCard key={cowork.id} cowork={cowork} />
              ))}
            </React.Fragment>
          ))}
      </div>

      {hasNextPage && !isFetchingNextPage && !isFetching && (
        <button
          className="h-12 rounded-md bg-yellow-100 px-3 py-2"
          onClick={() => fetchNextPage()}
        >
          Fetch more
        </button>
      )}
      {(isFetchingNextPage || isFetching) && <p>Loading...</p>}
      {!isFetchingNextPage && !isFetching && !hasNextPage && (
        <p>No more coworks</p>
      )}
    </>
  )
}
