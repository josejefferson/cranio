import React from 'react'
import { useTable } from 'react-table'
import Pill from '@/components/Admin/Logs/Pill'
import { ObjectInspector, chromeLight } from 'react-inspector'

function Table({ logs }: any) {
  const data = React.useMemo(() => logs, [logs])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Tempo',
        accessor: 'date',
        width: 150,
        Cell: ({ value }: any) => <>{new Date(value).toLocaleString()}</>
      },
      {
        Header: 'Nível',
        accessor: 'level',
        width: 80,
        Cell: ({ value }: any) => <Pill level={value}>{value}</Pill>
      },
      {
        Header: 'Título',
        accessor: 'title',
        minWidth: 80
      },
      {
        Header: 'Conteúdo',
        accessor: 'contents',
        width: 'auto',
        Cell: ({ value }: any) => {
          return value.map((content: any) => {
            if (typeof content === 'object') return JSON.stringify(content)
            return content
          })
        }
      },
      {
        Header: 'Detalhes',
        accessor: 'details',
        width: '400px',
        Cell: ({ value }: any) => {
          return value === undefined
            ? <></> :
            <ObjectInspector
              // @ts-ignore
              theme={{
                ...chromeLight,
                ...({ BASE_BACKGROUND_COLOR: 'transparent' })
              }}
              data={value}
            />
        }
      }
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data })

  return (
    <table {...getTableProps()} style={{ border: '0', color: 'black', width: '100%', userSelect: 'text' }}>
      <thead>
        {headerGroups.map((headerGroup: any, i: number) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={i}>
            {headerGroup.headers.map((column: any, i: number) => (
              <th
                {...column.getHeaderProps({
                  style: {
                    minWidth: column.minWidth,
                    width: column.width,
                    borderBottom: 'solid 3px red',
                    background: 'aliceblue',
                    color: 'black',
                    fontWeight: 'bold'
                  }
                })}
                key={i}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row: any, i: number) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()} key={i}>
              {row.cells.map((cell: any, i: number) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    key={i}
                    title={['date', 'title', 'contents'].includes(cell.column.id) && cell.value}
                    style={{
                      padding: '5px',
                      border: '0',
                      background: 'papayawhip'
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default React.memo(Table, (prevProps, nextProps) => {
  return prevProps.logs === nextProps.logs
})