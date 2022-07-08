import { ObjectInspector, chromeDark } from 'react-inspector'
import Pill from '@/components/Admin/Logs/Pill'
import React from 'react'
import { customDateFilter } from './custom-filters'

export const columns = [
  {
    label: 'Tempo',
    name: 'date',
    options: {
      filterType: 'custom',
      setCellProps: () => ({ style: { whiteSpace: 'nowrap' } }),
      customBodyRender: (value: any) => {
        if (isNaN(Number(new Date(value)))) return value
        return new Date(value).toLocaleString()
      },
      customFilterListOptions: customDateFilter.customFilterListOptions,
      filterOptions: customDateFilter.filterOptions
    }
  },
  {
    label: 'Nível',
    name: 'level',
    filterList: ['SUCCESS', 'ERROR', 'DEBUG', 'INFO', 'WARNING'],
    options: {
      setCellProps: () => ({ style: { whiteSpace: 'nowrap' } }),
      customBodyRender: (value: any) => {
        if (value === undefined) return <></>
        return <Pill level={value}>{value}</Pill>
      }
    }
  },
  {
    label: 'Título',
    name: 'title',
    options: {
      setCellProps: () => ({ style: { whiteSpace: 'nowrap' } }),
      customHeadLabelRender: (columnMeta: any) => (
        <div style={{ whiteSpace: 'nowrap' }}>{columnMeta.label}</div>
      )
    }
  },
  {
    label: 'Conteúdo',
    name: 'contents',
    options: {
      filterType: 'textField',
      customBodyRender: (value: any) => {
        if (value === undefined) return <></>
        if (!Array.isArray(value)) return value
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
      customBodyRender: (value: any) => {
        if (value === undefined) return <></>
        if (React.isValidElement(value)) return value
        return (
          <ObjectInspector
            data={value}
            // @ts-ignore
            theme={{
              ...chromeDark,
              ...({ BASE_BACKGROUND_COLOR: 'transparent' })
            }}
          />
        )
      }
    }
  }
]