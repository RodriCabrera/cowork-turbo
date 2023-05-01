import React from 'react'

import { Table } from 'ui'

export const Placeholder = ({ isLoading }: { isLoading: boolean }) => (
  <Table.Row>
    <Table.Cell>
      {isLoading ? 'Loading coworks...' : 'No coworks available'}
    </Table.Cell>
  </Table.Row>
)
