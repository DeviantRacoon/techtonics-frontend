/**
 * Hook de tabla inteligente para componentes en Next.js con TypeScript y MUI.
 * Ofrece paginación, selección, búsqueda, filtros anidados, ordenamiento y visibilidad de columnas.
 * 
 * Uso:
 * const table = useSmartTable({ rows, columns, defaultOrderBy: 'email' });
 * 
 * Luego puedes usar `table.filteredRows`, `table.handleSearch`, `table.handleFilterChange`, etc.
 */

import { useState, useCallback, useMemo } from 'react'
import type { ISmartTableProps, Row } from './types'

export function useSmartTable({
  rows,
  columns,
  defaultOrderBy
}: ISmartTableProps & { defaultOrderBy?: string }) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(15)
  const [selected, setSelected] = useState<Set<string | number>>(new Set())
  const [search, setSearch] = useState('')
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})
  const [orderBy, setOrderBy] = useState<string | null>(defaultOrderBy ?? null)
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc' | 'none'>('none')
  const [visibleColumns, setVisibleColumns] = useState<string[]>(() =>
    columns.filter(col => col.defaultVisible !== false).map(col => col.id)
  )

  const toggleColumnVisibility = (id: string) => {
    setVisibleColumns(prev =>
      prev.includes(id) ? prev.filter(colId => colId !== id) : [...prev, id]
    )
  }

  const visibleColumnDefs = useMemo(() => {
    return columns.filter(col => visibleColumns.includes(col.id))
  }, [columns, visibleColumns])

  const handleRowClick = useCallback((id: string | number) => {
    setSelected(prev => {
      const newSet = new Set(prev)
      newSet.has(id) ? newSet.delete(id) : newSet.add(id)
      return newSet
    })
  }, [])

  const handleSelectAllClick = useCallback((checked: boolean) => {
    setSelected(checked ? new Set(rows.map(r => r.id)) : new Set())
  }, [rows])

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage)
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+e.target.value)
    setPage(0)
  }

  const handleSearch = (value: string) => {
    setSearch(value)
    setPage(0)
  }

  function getValueFromPath(obj: Record<string, any>, path: string): any {
    return path.split('.').reduce((acc, key) => acc?.[key], obj)
  }

  const handleFilterChange = (label: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [label]: prev[label] === value ? '' : value
    }))
    setPage(0)
  }

  const handleClearFilters = () => {
    setActiveFilters({})
    setSearch('')
    setPage(0)
  }

  const handleToggleSort = (field: string) => {
    if (orderBy === field) {
      setOrderDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setOrderBy(field)
      setOrderDirection('asc')
    }
  }

  const filteredRows = useMemo(() => {
    let result = [...rows]

    if (search) {
      result = result.filter(row =>
        Object.values(row).some(val =>
          val?.toString().toLowerCase().includes(search.toLowerCase())
        )
      )
    }

    for (const [key, value] of Object.entries(activeFilters)) {
      if (value) {
        result = result.filter(row => {
          const target = getValueFromPath(row, key)
          return target === value
        })
      }
    }


    if (orderBy) {
      result.sort((a, b) => {
        const aVal = getValueFromPath(a, orderBy)
        const bVal = getValueFromPath(b, orderBy)
        if (aVal === bVal) return 0
        return orderDirection === 'asc'
          ? aVal > bVal ? 1 : -1
          : aVal < bVal ? 1 : -1
      })
    }

    return result
  }, [rows, search, activeFilters, orderBy, orderDirection])

  return {
    selected,
    search,
    activeFilters,
    orderBy,
    orderDirection,
    filteredRows,
    rowsPerPage,
    page,
    visibleColumns,
    visibleColumnDefs,
    toggleColumnVisibility,
    handleRowClick,
    handleSelectAllClick,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSearch,
    handleFilterChange,
    handleClearFilters,
    handleToggleSort,
  }
}
