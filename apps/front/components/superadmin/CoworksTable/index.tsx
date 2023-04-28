import React from 'react'
import { Column, useTable } from 'react-table'

import { Table } from 'ui'
import { ActionsCell } from './ActionsCell'

const { Cell, Body, Header, Row } = Table

interface Cowork {
  coworkId: string
  coworks: string
  email: string
  status: string
}

export const CoworksTable = () => {
  // TODO: Replace this mocked data:
  const data = React.useMemo(
    () => [
      {
        coworkId: '781236hgjds',
        coworks: 'La Maquinita',
        email: 'info@lmq.com',
        status: 'Active'
      },
      {
        coworkId: 'ahsdj87123',
        coworks: 'Huerta',
        email: 'contact@huertacoworking.com',
        status: 'Active'
      },
      {
        coworkId: '987asd12',
        coworks: 'Bionic',
        email: 'info@bionic.com',
        status: 'Active'
      }
    ],
    []
  )

  const columns: Column<Cowork & { actions?: string }>[] = React.useMemo(
    () => [
      {
        Header: 'coworks',
        accessor: 'coworks'
      },
      {
        Header: 'email',
        accessor: 'email'
      },
      {
        Header: 'status',
        accessor: 'status',
        Cell: ({ value }) => (
          <span className="rounded-full bg-green-200 px-3 py-1 text-xs text-green-600">
            {value}
          </span>
        )
      },
      {
        Header: 'actions',
        accessor: 'actions',
        Cell: ({ row }) => <ActionsCell coworkId={row.original.coworkId} />
      }
    ],
    []
  )

  const tableInstance = useTable({ columns, data })

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
                {
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
                }
              </Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
