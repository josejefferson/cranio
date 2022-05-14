import React from 'react'
import { useTable } from 'react-table'
import type { GetServerSideProps } from 'next'
import axios from '../api/'

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: logs } = await axios.get('/logs')
  return {
    props: {
      logs: logs.reverse()
    }
  }
}

function Pill({ level, children }: any) {
  const LEVELS: any = {
    'SUCCESS': 'green',
    'WARNING': 'yellow',
    'ERROR': 'red',
    'INFO': 'blue',
    'DEBUG': 'black'
  }

  return (
    <div
      style={{
        backgroundColor: LEVELS[level],
        color: 'white',
        borderRadius: '1000px',
        padding: '5px 10px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '10px'
      }}
    >
      {children}
    </div>
  )
}

function App({ logs }: any) {
  const data = React.useMemo(() => logs, [logs])
  console.log(data)

  const columns = React.useMemo(
    () => [
      {
        Header: 'Tempo',
        accessor: 'date',
        Cell: ({ value }: any) => <>{new Date(value).toLocaleString()}</>
      },
      {
        Header: 'Nível',
        accessor: 'level',
        Cell: ({ value }: any) => <Pill level={value}>{value}</Pill>
      },
      {
        Header: 'Título',
        accessor: 'title'
      },
      {
        Header: 'Conteúdo',
        accessor: 'contents',
        Cell: ({ value }: any) => {
          return value.map((content:any) => {
            if (typeof content === 'object') return JSON.stringify(content)
            return content
          })
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
    <table {...getTableProps()} style={{ border: '0', color: 'black' }}>
      <thead>
        {headerGroups.map((headerGroup: any, i: number) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={i}>
            {headerGroup.headers.map((column: any, i: number) => (
              <th
                {...column.getHeaderProps()}
                key={i}
                style={{
                  borderBottom: 'solid 3px red',
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold'
                }}
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

export default App
