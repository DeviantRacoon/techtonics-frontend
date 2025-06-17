import { IFilterProps } from "./filter-props.interface"

export interface Column {
  id: string
  label: string
  align?: 'right' | 'left' | 'center'
  type?: 'status' | 'date' | 'datetime' | 'money' | 'percentage' | 'image'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  tooltip?: boolean
}

export interface Row {
  id: string | number
  [key: string]: any
}

export interface Action {
  label: string
  icon: React.ReactNode
  onClick: (row: Row) => void
  hidden?: boolean
}

export interface ISmartTableProps {
  columns: Column[]
  rows: Row[]
  total?: number
  page?: number
  loading?: boolean
  onClick?: (row: Row) => void
  actions?: Action[]
  filters?: IFilterProps[],
  orderByField?: string
}
