import { PropsWithChildren } from 'react'

const Table = ({ children }: PropsWithChildren) => (
  <table className="w-full min-w-max table-auto">{children}</table>
)

const Row = ({ children, odd }: PropsWithChildren<{ odd?: boolean }>) => (
  <tr
    className={`text-sm leading-normal hover:bg-gray-100 ${
      odd ? 'bg-gray-50' : ''
    }`}
  >
    {children}
  </tr>
)

const Body = ({ children }: PropsWithChildren) => (
  <tbody className="text-sm font-light text-gray-600">{children}</tbody>
)

const Cell = ({
  children,
  className
}: PropsWithChildren<{ className?: string }>) => (
  <td className={`px-6 py-3 text-left ${className}`}>{children}</td>
)

const Header = ({
  children,
  className
}: PropsWithChildren<{ className?: string }>) => (
  <th className={`px-6 py-3 text-left ${className}`}>{children}</th>
)

Table.Body = Body
Table.Cell = Cell
Table.Row = Row
Table.Header = Header

export { Table }
