'use client'

import React, { useState } from 'react'
import { Box, Stack, useTheme, useMediaQuery } from '@mui/material'

import SmartFilterInput from '../SmartFilter/SmartFilterInput'
import SmartFilterButtons from '../SmartFilter/SmartFilterButtons'
import SmartFilterMenu from '../SmartFilter/SmartFilterMenu'

import type { FilterDefinition, Row, Column } from '../SmartTable/types'

export interface SmartFilterProps {
  placeholder?: string
  search: string
  onSearch: (value: string) => void
  filters: FilterDefinition[]
  activeFilters: Record<string, string>
  onFilterChange: (label: string, value: string) => void
  onClearFilters: () => void
  orderBy: string | null
  onToggleSort: (field: string) => void
  orderDirection?: 'asc' | 'desc' | 'none'
  filteredRows: any
  exportFilename?: string

  // ✅ nuevos props para columnas visibles
  columns: Column[]
  visibleColumns: string[]
  toggleColumnVisibility: (id: string) => void
}

export default function SmartFilter({
  placeholder = 'Buscar...',
  search,
  onSearch,
  filters,
  activeFilters,
  onFilterChange,
  onClearFilters,
  onToggleSort,
  orderDirection,
  orderBy,
  filteredRows,
  exportFilename,
  columns,
  visibleColumns,
  toggleColumnVisibility
}: SmartFilterProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  return (
    <Box mb={2} p={2} borderRadius={1}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <SmartFilterInput
          value={search}
          onChange={onSearch}
          onSearch={() => onSearch(search)}
          placeholder={placeholder}
        />

        {filters.length > 0 && (<SmartFilterButtons
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          onToggleSort={onToggleSort}
          order={orderDirection}
          orderBy={orderBy ?? 'none'}
          filteredRows={filteredRows}
          exportFilename={exportFilename}
          columns={columns}
          visibleColumns={visibleColumns}
          toggleColumnVisibility={toggleColumnVisibility}
        />)}
      </Stack>

      <SmartFilterMenu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        filters={filters}
        activeFilters={activeFilters}
        onFilterSelect={onFilterChange}
        onClearFilters={onClearFilters}
        isMobile={isMobile}
      />
    </Box>
  )
}
