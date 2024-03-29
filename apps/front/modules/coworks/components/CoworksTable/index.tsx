import { useMemo } from 'react'
import { Column, useTable } from 'react-table'

import { Table } from 'ui'
import { CoworkFullGetRes, ArrayElement } from 'types'

import { CellPlaceholder } from '@/common/components/CellPlaceholder'
import { useFetchCoworks } from '@/modules/coworks/hooks/useFetchCoworks'
import { Pagination } from '@/modules/coworks/components/CoworksTable/pagination'
import { usePagination } from '@/modules/coworks/hooks/usePagination'
import { ActionsCell } from './ActionsCell'
import { StatusBadge } from '@/common/components/StatusBadge'

const { Cell, Body, Header, Row } = Table

export const CoworksTable = () => {
  const { pageSize, pageIndex, nextPage, prevPage, handlePageSizeChange } =
    usePagination()

  const { coworks, isLoading, isFetching, totalPages } = useFetchCoworks({
    pageIndex,
    pageSize
  })

  const columns: Column<
    ArrayElement<CoworkFullGetRes['results']> & {
      actions?: string
      status?: string
    }
  >[] = useMemo(
    () => [
      {
        Header: 'coworks',
        accessor: 'name'
      },
      {
        Header: 'email',
        accessor: 'email'
      },
      {
        Header: 'status',
        accessor: 'status',
        Cell: ({ value }) => <StatusBadge status={value} />
      },
      {
        Header: 'actions',
        accessor: 'actions',
        Cell: ({ row }) => <ActionsCell coworkId={row.original.id} />
      }
    ],
    []
  )

  const tableInstance = useTable({
    columns,
    data: coworks || []
  })

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  const isDataEmpty = coworks?.length === 0

  return (
    <div className="overflow-x-auto">
      <div className="flex  min-w-max items-center justify-center overflow-hidden  font-sans">
        <div className="w-full ">
          <div className="my-6 rounded bg-white shadow-md">
            <Table {...getTableProps()}>
              <thead>
                {
                  // Loop over the header rows
                  headerGroups.map((headerGroup) => {
                    const { key } = headerGroup.getHeaderGroupProps()

                    // Apply the header row props
                    return (
                      <tr
                        className="bg-gray-200 text-sm uppercase leading-normal text-gray-600"
                        {...headerGroup.getHeaderGroupProps()}
                        key={key}
                      >
                        {
                          // Loop over the headers in each row
                          headerGroup.headers.map((column) => (
                            // Apply the header cell props
                            <Header
                              {...column.getHeaderProps()}
                              key={column.id}
                            >
                              {
                                // Render the header
                                column.render('Header')
                              }
                            </Header>
                          ))
                        }
                      </tr>
                    )
                  })
                }
              </thead>
              {/* Apply the table body props */}
              <Body {...getTableBodyProps()}>
                {isDataEmpty && <CellPlaceholder text="No coworks available" />}
                {(isLoading || isFetching) && !coworks?.length ? (
                  <CellPlaceholder
                    text={
                      isLoading || isFetching
                        ? 'Loading coworks...'
                        : 'No coworks available'
                    }
                  />
                ) : (
                  // Loop over the table rows
                  rows.map((row) => {
                    // Prepare the row for display
                    prepareRow(row)
                    return (
                      // Apply the row props
                      <Row
                        {...row.getRowProps()}
                        key={row.id}
                        odd={Boolean(row.index % 2)}
                      >
                        {
                          // Loop over the rows cells
                          row.cells.map((cell, i) => {
                            // Apply the cell props
                            const { column } = cell
                            const isActionsCell = column.Header === 'actions'
                            const isFirstCell = column.Header === 'coworks'
                            return (
                              <Cell
                                {...cell.getCellProps()}
                                key={i}
                                className={`${isActionsCell ? 'w-20' : ''} ${
                                  isFirstCell && 'font-medium'
                                }`}
                              >
                                {
                                  // Render the cell contents
                                  cell.render('Cell')
                                }
                              </Cell>
                            )
                          })
                        }
                      </Row>
                    )
                  })
                )}
              </Body>
            </Table>
          </div>
          <Pagination
            pageIndex={pageIndex}
            totalPages={totalPages}
            handlePageSizeChange={handlePageSizeChange}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        </div>
      </div>
    </div>
  )
}
