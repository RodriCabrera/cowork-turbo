import React from 'react'

import { CoworkCard } from './CoworkCard'
import { useInfiniteCoworks } from '../hooks/useInfiniteCoworks'
import { LoaderThreeDots } from '@/common/components/LoaderThreeDots'

export const CoworksGrid = () => {
  const { data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } =
    useInfiniteCoworks()

  return (
    <>
      <div className="flex w-2/3 flex-wrap gap-4">
        {data &&
          data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.results?.map((cowork) => (
                <CoworkCard key={cowork.id} cowork={cowork} />
              ))}
            </React.Fragment>
          ))}
        {!isFetchingNextPage && !isFetching && !hasNextPage && (
          <div className=" h-80 w-80 cursor-pointer rounded-md bg-gray-50 p-2">
            No more coworks
          </div>
        )}
      </div>
      <div className="h-12">
        {(isFetchingNextPage || isFetching) && <LoaderThreeDots />}
      </div>
      <div className="mb-10 flex flex-col items-center justify-center gap-8">
        <button
          className="rounded-md bg-yellow-100 p-3 disabled:bg-gray-100  disabled:text-gray-800"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage || isFetching}
        >
          Fetch more
        </button>
      </div>
    </>
  )
}
