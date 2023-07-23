import React from 'react'

import { CoworkCard } from './CoworkCard'
import { useInfiniteCoworks } from '../hooks/useInfiniteCoworks'
import { LoaderThreeDots } from '@/common/components/LoaderThreeDots'

export const CoworksGrid = () => {
  const { data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } =
    useInfiniteCoworks()

  const showLoader = isFetchingNextPage || isFetching
  const showNoMoreCoworks = !isFetchingNextPage && !isFetching && !hasNextPage

  const isFetchMoreButtonDisabled =
    !hasNextPage || isFetchingNextPage || isFetching

  return (
    <>
      <section className="flex max-w-5xl flex-wrap gap-4">
        {data &&
          data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.results?.map((cowork) => (
                <CoworkCard key={cowork.id} cowork={cowork} />
              ))}
            </React.Fragment>
          ))}
        {showNoMoreCoworks && (
          <div className=" flex h-80 w-80 items-center justify-center rounded-md bg-gray-50/50 p-2">
            No more coworks
          </div>
        )}
      </section>
      <div className="mb-10 flex h-12 justify-center">
        {showLoader ? (
          <LoaderThreeDots />
        ) : (
          <div className="flex flex-col items-center justify-center gap-8">
            {hasNextPage && (
              <button
                className="rounded-md bg-yellow-100 p-3 disabled:bg-gray-100 disabled:text-gray-800"
                onClick={() => fetchNextPage()}
                disabled={isFetchMoreButtonDisabled}
              >
                Fetch more
              </button>
            )}
          </div>
        )}
      </div>
    </>
  )
}
