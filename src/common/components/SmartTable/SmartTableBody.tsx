import React, { useCallback, useState } from 'react'
import {
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Skeleton,
  Chip,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert'
import { format as formatDate } from 'date-fns'

import type { Column, Row, Action } from './types';
import { STATUS_TO_VARIANT } from '@/common/utils/constants'

interface SmartTableBodyProps {
  columns: Column[]
  rows: Row[]
  loading: boolean
  selected: Set<string | number>
  onRowClick: (id: string | number) => void
  onClick: (row: Row) => void | null
  actions?: Action[]
}

const pixelSizeMap: Record<NonNullable<Column['size']>, number> = {
  xs: 80,
  sm: 120,
  md: 160,
  lg: 200,
  xl: 240,
  xxl: 300,
}

const SmartTableBody = ({
  columns,
  rows,
  loading,
  selected,
  onClick,
  actions,
}: SmartTableBodyProps) => {
  const [menuState, setMenuState] = useState<{ anchorEl: HTMLElement; row: Row } | null>(null)

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, row: Row) => {
    setMenuState({ anchorEl: event.currentTarget, row })
  }

  const handleMenuClose = () => {
    setMenuState(null)
  }

  const clickMenuItem = (action: Action) => {
    if (menuState) action.onClick(menuState.row)
    handleMenuClose()
  }

  function getValueFromPath(obj: Record<string, any>, path: string): any {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  }

  const renderDefaultCell = useCallback((column: Column, value: any, row: Row) => {
    if (column.render) return column.render(value, row)

    switch (column.type) {
      case 'status': {
        const label = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
        return (
          <Chip
            size="small"
            label={label}
            sx={{ textTransform: 'capitalize', width: pixelSizeMap[column.size ?? 'xs'] }}
            color={(STATUS_TO_VARIANT[value] as any) ?? 'default'}
          />
        )
      }

      case 'date': {
        try {
          return formatDate(new Date(value), 'yyyy-MM-dd')
        } catch {
          return '-'
        }
      }

      case 'datetime': {
        try {
          return formatDate(new Date(value), 'yyyy-MM-dd HH:mm:ss')
        } catch {
          return '-'
        }
      }

      case 'money':
        return `$${Number(value).toFixed(2)}`

      case 'percentage':
        return `${Number(value).toFixed(2)}%`

      case 'image':
        return <Avatar src={typeof value === 'string' ? value : undefined} alt="avatar" sx={{ width: 28, height: 28 }} />

      default:
        return value
    }
  }, [])

  const renderWithTooltip = (content: React.ReactNode, column: Column) => (
    <Tooltip title={content} placement="bottom">
      <Typography
        suppressHydrationWarning
        noWrap
        sx={{ textOverflow: 'ellipsis', width: pixelSizeMap[column.size ?? 'md'] }}
      >
        {content}
      </Typography>
    </Tooltip>
  )

  if (loading) {
    return (
      <TableBody>
        {Array.from({ length: 5 }).map((_, i) => (
          <TableRow key={`skeleton-${i}`}>
            {columns.map((col) => (
              <TableCell key={`skeleton-${i}-${col.id}`}>
                <Skeleton variant="text" width="100%" />
              </TableCell>
            ))}
            <TableCell>
              <Skeleton variant="circular" width={24} height={24} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    )
  }

  return (
    <TableBody sx={{ '&:last-child td, &:last-child th': { border: 0, paddingY: 1.5 } }}>
      {rows.map((row, rowIdx) => (
        <TableRow key={`${row.id}-${rowIdx}`} hover selected={selected.has(row.id)}>
          {columns.map((column, colIdx) => {
            const raw = getValueFromPath(row, column.id)
            const content = renderDefaultCell(column, raw, row)

            return (
              <TableCell
                key={`${row.id}-${column.id}-${rowIdx}-${colIdx}`}
                align={column.align}
                onClick={() => onClick?.(row)}
                sx={{ cursor: 'pointer' }}>
                {column.tooltip && column.type !== 'image'
                  ? renderWithTooltip(content, column)
                  : column.type === 'status' || column.type === 'image'
                    ? content
                    : <Typography suppressHydrationWarning>{content}</Typography>}
              </TableCell>
            )
          })}

          {actions && (
            <TableCell key={`${row.id}-actions-${rowIdx}`} align="right" sx={{ cursor: 'pointer' }}>
              <Tooltip title="Más opciones" placement="bottom">
                <IconButton onClick={(e) => handleMenuClick(e, row)} size="small">
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </TableCell>
          )}
        </TableRow>
      ))}

      {!!actions?.length && menuState && (
        <Menu anchorEl={menuState.anchorEl} open onClose={handleMenuClose}>
          {actions.map((action, actIdx) => {
            const isHidden = typeof action.hidden === 'function'
              ? action.hidden(menuState.row)
              : action.hidden;

            if (isHidden) return null;

            return (
              <MenuItem
                key={`${menuState.row.id}-${action.label}-${actIdx}`}
                onClick={() => clickMenuItem(action)}
                sx={{ cursor: 'pointer', gap: 1, display: 'flex' }}
              >
                {action.icon}
                {action.label}
              </MenuItem>
            )
          })}
        </Menu>
      )}
    </TableBody>
  )
}

export default React.memo(SmartTableBody)
