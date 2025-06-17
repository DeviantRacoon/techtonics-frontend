import React from 'react'
import { TableHead, TableRow, TableCell, Typography, TableSortLabel } from '@mui/material'
import type { Column } from './types'

interface SmartTableHeaderProps {
  columns: Column[]
  filteredRows: any[]
  selected: Set<string | number>
  onSelectAllClick: (checked: boolean) => void
  actions?: boolean
  orderBy: string | null
  orderDirection: 'asc' | 'desc' | 'none'
  onToggleSort: (field: string) => void
}

const sizeUnitsMap: Record<NonNullable<Column['size']>, number> = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
  xxl: 6,
}

const getColumnWidth = (columns: Column[], column: Column): string => {
  const specifiedUnits = columns.reduce((sum, col) => {
    const units = col.size ? sizeUnitsMap[col.size] : 0
    return sum + units
  }, 0)

  const defaultColumns = columns.filter(col => !col.size).length

  if (column.size) {
    const units = sizeUnitsMap[column.size]
    return `${(units / 12) * 100}%`
  }

  return `${((12 - specifiedUnits) / defaultColumns / 12) * 100}%`
}

const SmartTableHeader = ({
  columns,
  actions,
  orderBy,
  orderDirection,
  onToggleSort
}: SmartTableHeaderProps) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => {
          const isSorted = orderBy === column.id
          const sortDirection = isSorted ? orderDirection : 'asc'
          const width = getColumnWidth(columns, column)

          return (
            <TableCell
              key={`${column.id}-header`}
              align={column.align}
              sx={{ width, whiteSpace: 'nowrap', cursor: 'pointer' }}
              onClick={() => onToggleSort(column.id)}>
              {column.headerRender ? (
                column.headerRender()
              ) : (
                <TableSortLabel
                  active={isSorted}
                  direction={sortDirection === 'none' ? 'asc' : sortDirection}
                >
                  <Typography fontWeight="bold" fontSize="0.875rem" textAlign={column.align}>
                    {column.label}
                  </Typography>
                </TableSortLabel>
              )}
            </TableCell>
          )
        })}

        {actions && (
          <TableCell align="right">
            <Typography fontWeight="bold" fontSize="0.875rem">Acciones</Typography>
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  )
}

export default React.memo(SmartTableHeader)
