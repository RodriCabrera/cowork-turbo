import Link from 'next/link'
import { useMemo } from 'react'
import { Column, useTable } from 'react-table'

import { Table } from 'ui'

import { CellPlaceholder } from '@/common/components/CellPlaceholder'

const { Cell, Body, Header, Row } = Table

export const EmployeeList = ({
  employees,
  isLoading
}: {
  // TODO: Type employees, it is User[] from prisma client
  employees: any
  isLoading: boolean
}) => {
  const columns: Column[] = useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName'
      },
      {
        Header: 'Last Name',
        accessor: 'lastName'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Role',
        accessor: 'role'
      }
    ],
    []
  )

  const tableInstance = useTable({
    columns,
    data: employees || []
  })

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  return (
    <div className="max-w-5xl ">
      <div className="my-6 flex w-full">
        <Link
          href={'people/add'}
          className="cursor-pointer rounded-md border-2 bg-gray-100 px-3 py-2 text-sm font-medium hover:bg-gray-200"
        >
          Add employees
        </Link>
      </div>

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
                  {employees?.length === 0 && (
                    <CellPlaceholder text="No employees" />
                  )}
                  {isLoading ? (
                    <CellPlaceholder
                      text={isLoading ? 'Loading people...' : 'No employees'}
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
                              return (
                                <Cell
                                  {...cell.getCellProps()}
                                  key={i}
                                  className="cursor-pointer"
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
          </div>
        </div>
      </div>
    </div>
  )
}
