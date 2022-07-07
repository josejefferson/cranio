import { ObjectInspector, chromeDark } from 'react-inspector'
import Pill from '@/components/Admin/Logs/Pill'

export const columns = [
  {
    label: 'Tempo',
    name: 'date',
    options: {
      setCellProps: () => ({ style: { minWidth: '180px', maxWidth: '180px' } }),
      customBodyRender: (value: any) => {
        return new Date(value).toLocaleString()
      }
    }
  },
  {
    label: 'Nível',
    name: 'level',
    filterList: ['SUCCESS', 'ERROR', 'DEBUG', 'INFO', 'WARNING'],
    options: {
      setCellProps: () => ({ style: { minWidth: '110px', maxWidth: '110px' } }),
      customBodyRender: (value: any) => {
        return <Pill level={value}>{value}</Pill>
      }
    }
  },
  {
    label: 'Título',
    name: 'title',
    options: {
      setCellProps: () => ({ style: { minWidth: '110px', maxWidth: '110px' } })
    }
  },
  {
    label: 'Conteúdo',
    name: 'contents',
    options: {
      filterType: 'textField',
      setCellProps: () => ({ style: {} }),
      customBodyRender: (value: any) => {
        return value.map((content: any) => {
          if (typeof content === 'object') return JSON.stringify(content)
          return content
        })
      }
    }
  },
  {
    label: 'Detalhes',
    name: 'details',
    sort: false,
    options: {
      filterType: 'textField',
      setCellProps: () => ({ style: { minWidth: '400px', maxWidth: '400px' } }),
      customBodyRender: (value: any) => {
        return value === undefined
          ? <></>
          : <ObjectInspector
            // @ts-ignore
            theme={{
              ...chromeDark,
              ...({ BASE_BACKGROUND_COLOR: 'transparent' })
            }}
            data={value}
          />
      }
    }
  }
]