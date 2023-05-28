import { Table } from 'ui'

export const CellPlaceholder = ({ text }: { text: string }) => (
  <Table.Row>
    <Table.Cell>{text}</Table.Cell>
  </Table.Row>
)
