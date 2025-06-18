'use client'

import React, { useMemo } from 'react'
import {
  Paper,
  Box,
  TableContainer,
  Table,
  TablePagination,
  Typography
} from '@mui/material'

import TableHeader from './SmartTableHeader'
import TableBodyContent from './SmartTableBody'
import SmartFilter from '../SmartFilter'

import { useSmartTable } from './useSmartTable'
import { ISmartTableProps } from './types'

interface SmartTableExtendedProps extends ISmartTableProps {
  defaultOrderBy?: string
  exportFilename?: string
}

const SmartTable = (props: SmartTableExtendedProps) => {
  const {
    columns,
    actions,
    onClick,
    filters,
    loading = false,
    exportFilename,
    defaultOrderBy
  } = props

  const {
    selected,
    search,
    activeFilters,
    orderBy,
    rowsPerPage,
    filteredRows,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRowClick,
    handleSelectAllClick,
    handleSearch,
    handleFilterChange,
    handleClearFilters,
    handleToggleSort,
    page,
    orderDirection,
    visibleColumns,
    toggleColumnVisibility
  } = useSmartTable({ ...props, defaultOrderBy })

  const paginatedRows = useMemo(() => {
    if (loading) return []
    const start = page * rowsPerPage
    return filteredRows.slice(start, start + rowsPerPage)
  }, [filteredRows, page, rowsPerPage, loading])

  const visibleColumnDefs = useMemo(
    () => columns.filter(col => visibleColumns.includes(col.id)),
    [columns, visibleColumns]
  )

  const exportableRows = useMemo(() => {
    return filteredRows.map(row => {
      const subset: Record<string, any> = {};
      visibleColumns.forEach(colId => {
        subset[colId] = row[colId];
      });
      return subset;
    });
  }, [filteredRows, visibleColumns]);

  return (
    <Paper elevation={1} sx={{ borderRadius: 1 }}>
      {/* 🔍 Barra de filtros + acciones */}
      <SmartFilter
        placeholder="Buscar..."
        orderDirection={orderDirection}
        orderBy={orderBy}
        search={search}
        onSearch={handleSearch}
        filters={filters || []}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        onToggleSort={handleToggleSort}
        filteredRows={exportableRows}
        exportFilename={exportFilename}
        columns={columns}
        visibleColumns={visibleColumns}
        toggleColumnVisibility={toggleColumnVisibility}
      />

      {/* 📋 Tabla */}
      <TableContainer>
        <Table stickyHeader aria-labelledby="tableTitle">
          <TableHeader
            columns={visibleColumnDefs}
            filteredRows={filteredRows}
            selected={selected}
            onSelectAllClick={handleSelectAllClick}
            actions={!!actions}
            orderBy={orderBy}
            orderDirection={orderDirection}
            onToggleSort={handleToggleSort}
          />

          <TableBodyContent
            columns={visibleColumnDefs}
            rows={paginatedRows}
            loading={loading}
            selected={selected}
            onRowClick={handleRowClick}
            onClick={onClick ?? (() => { })}
            actions={actions}
          />
        </Table>
      </TableContainer>

      {/* 📄 Paginación */}
      <TablePagination
        rowsPerPageOptions={[10, 15, 30]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
        }
      />

      {/* ✅ Selección masiva */}
      {selected.size > 0 && (
        <Box px={2} py={1} bgcolor="action.hover">
          <Typography variant="body2">{selected.size} seleccionados</Typography>
        </Box>
      )}
    </Paper>
  )
}

export default React.memo(SmartTable)
