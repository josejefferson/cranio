import React from 'react'

function Table({ getTableProps, headerGroups, getTableBodyProps, rows, prepareRow }: any) {
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

export default React.memo(Table)