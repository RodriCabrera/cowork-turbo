import React, { useState } from 'react'
import { Column, useTable } from 'react-table'

import { Table } from 'ui'
import { CoworkFullGetRes, ArrayElement } from 'types'

import { ActionsCell } from './ActionsCell'
import { Placeholder } from './Placeholder'
import { useGetCoworks } from '@/hooks/useGetCoworks'
import { COLORS_BY_STATUS } from './constants'

const { Cell, Body, Header, Row } = Table

export const CoworksTable = () => {
  const [pageSize, setPageSize] = useState(10)
  const [pageIndex, setPageIndex] = useState(1)

  const { coworks, isLoading, isFetching, totalPages } = useGetCoworks({
    pageIndex,
    pageSize
  })

  const nextPage = () => setPageIndex((prevState) => prevState + 1)
  const prevPage = () => setPageIndex((prevState) => prevState - 1)
  const handlePageSizeChange = (size: number) => setPageSize(size)

  const columns: Column<
    ArrayElement<CoworkFullGetRes['results']> & {
      actions?: string
      status?: string
    }
  >[] = React.useMemo(
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
        Cell: ({ value }) => {
          return (
            <span
              className={`rounded-full  px-3 py-1 text-xs ${COLORS_BY_STATUS[value]}`}
            >
              {value}
            </span>
          )
        }
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
                {isLoading || isFetching ? (
                  <Placeholder isLoading={isLoading || isFetching} />
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

                            const isActionsCell =
                              cell.column.Header === 'actions'
                            const isFirstCell = cell.column.Header === 'coworks'
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
          <div className="flex justify-end pb-8 pt-0">
            <div className="flex items-center gap-4 rounded-md bg-white p-2">
              <div>Page size:</div>
              <select onChange={(e) => handlePageSizeChange(+e.target.value)}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <button
                onClick={prevPage}
                disabled={pageIndex === 1}
                className="cursor-pointer rounded-md border-2 bg-gray-50/100 px-3 py-2 text-sm font-medium"
              >
                {'<'}
              </button>
              <p>
                Page {pageIndex} of {totalPages}
              </p>
              <button
                onClick={nextPage}
                disabled={pageIndex === totalPages}
                className="cursor-pointer rounded-md border-2 bg-gray-50/100 px-3 py-2 text-sm font-medium"
              >
                {'>'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
