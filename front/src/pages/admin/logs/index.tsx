import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import axios from '@/api/index'
import MUIDataTable from 'mui-datatables'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import HeightIcon from '@mui/icons-material/Height'
import RefreshIcon from '@mui/icons-material/Refresh'
import { lang } from '@/components/Admin/Logs/lang'
import { columns } from '@/components/Admin/Logs/columns'

const defaultMaterialTheme = createTheme({
  palette: { mode: 'dark' },
  components: {
    // @ts-ignore
    MUIDataTableBodyCell: {
      styleOverrides: {
        root: {
          padding: '3px 10px'
        }
      }
    }
  }
})

const customFilterDialogFooter = (currentFilterList: any, applyNewFilters: any) => {
  return (
    <div style={{ marginTop: '40px' }}>
      <Button variant="contained" onClick={applyNewFilters}>{lang.filter.apply}</Button>
    </div>
  )
}

const defaultData = {
  // date: new Date().toISOString(),
  // level: <LinearProgress />
  date: <LinearProgress />,
  level: <LinearProgress />,
  title: <LinearProgress />,
  contents: <LinearProgress />,
  details: <LinearProgress />
}

async function fetchData(setData: Function) {
  setData([defaultData])
  const { data } = await axios.get('/logs')
  setData(data)
}

const Logs = () => {
  const [resizableColumns, setResizableColumns] = React.useState(false)
  const [data, setData] = React.useState([defaultData])

  React.useEffect(() => { fetchData(setData) }, [])

  const customToolbar = () => {
    return (
      <>
        <Tooltip title={lang.toolbar.adjustColumnWidth} disableFocusListener>
          <IconButton
            aria-label={lang.toolbar.adjustColumnWidth}
            onClick={() => setResizableColumns(!resizableColumns)}
          >
            <HeightIcon style={{ transform: 'rotate(90deg)' }} />
          </IconButton>
        </Tooltip>

        <Tooltip title={lang.toolbar.refresh} disableFocusListener>
          <IconButton
            aria-label={lang.toolbar.refresh}
            onClick={() => fetchData(setData)}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </>
    )
  }

  const options = {
    confirmFilters: true,
    customFilterDialogFooter,
    customToolbar,
    filterType: 'dropdown',
    fixedHeader: true,
    resizableColumns: resizableColumns,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100, 200, 500, 1000],
    selectableRows: 'none',
    sortOrder: { name: 'date', direction: 'desc' },
    tableBodyHeight: 'calc(100vh - 64px - 53px)',
    textLabels: lang
  }

  return (
    <>
      <ThemeProvider theme={defaultMaterialTheme}>
        <MUIDataTable
          title={'Logs do Crânio'}
          data={data}
          // @ts-ignore
          columns={columns}
          // @ts-ignore
          options={options}
          className="no-border-radius"
        />
      </ThemeProvider>
    </>
  )
}

export async function getServerSideProps() {
  const { data } = await axios.get('/logs')
  return {
    props: {
      data
    }
  }
}

export default Logs