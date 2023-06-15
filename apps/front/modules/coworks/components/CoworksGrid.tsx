import React from 'react'
import { CoworkCard } from './CoworkCard'
import { useInfiniteCoworks } from '../hooks/useInfiniteCoworks'

export const CoworksGrid = () => {
  const {
    data,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    status
  } = useInfiniteCoworks()
  console.log('has next page', hasNextPage)

  return (
    <div className="flex w-2/3 flex-wrap gap-4 pb-12">
      {data &&
        data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.results?.map((cowork) => (
              <CoworkCard key={cowork.id} cowork={cowork} />
            ))}
          </React.Fragment>
        ))}
      {/* TODO: Check the notifications */}
      {hasNextPage && !isFetchingNextPage ? (
        <button
          className="rounded-md bg-yellow-100 px-3 py-2"
          onClick={() => fetchNextPage()}
        >
          fetch more
        </button>
      ) : (
        <p>Loading</p>
      )}
      {!isFetchingNextPage && !hasNextPage && <p>No more coworks</p>}
    </div>
  )
}
