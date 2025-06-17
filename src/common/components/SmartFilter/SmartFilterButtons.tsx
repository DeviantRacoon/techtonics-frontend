'use client'

import React, { useState, useMemo } from 'react'
import {
  Stack,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Checkbox,
  Typography,
  Divider,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material'

import ThemedIcon from '../ThemedIcon'

import DownloadIcon from '@mui/icons-material/Download'
import ViewColumnIcon from '@mui/icons-material/ViewColumn'

import { exportToCSV } from '@/common/utils/exportToCSV'
import type { Column, Row } from '../SmartTable/types'

interface Props {
  anchorEl: HTMLElement | null
  setAnchorEl: (el: HTMLElement | null) => void
  onToggleSort?: (field: string) => void
  order?: 'none' | 'asc' | 'desc'
  orderBy?: string
  filteredRows: Row[]
  exportFilename?: string
  columns: Column[]
  visibleColumns: string[]
  toggleColumnVisibility: (id: string) => void
}

export default function SmartFilterButtons({
  setAnchorEl,
  filteredRows,
  exportFilename,
  columns,
  visibleColumns,
  toggleColumnVisibility
}: Props) {
  const [anchorColumns, setAnchorColumns] = useState<null | HTMLElement>(null)
  const [openDialog, setOpenDialog] = useState(false)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleColumnBtnClick = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobile) {
      setOpenDialog(true)
    } else {
      setAnchorColumns(e.currentTarget)
    }
  }

  const exportHeaders = useMemo(() => {
    return columns
      .filter(col => visibleColumns.includes(col.id))
      .map(col => ({ key: col.id, label: col.label }))
  }, [columns, visibleColumns])


  return (
    <>
      <Stack direction="row" spacing={1} alignItems="center">
        {/* Filtros */}
        <Tooltip title="Filtros avanzados">
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small">
            <ThemedIcon src="/assets/svg/options-outline.svg" alt="Filtros" width={20} />
          </IconButton>
        </Tooltip>

        {/* Exportar */}
        <Tooltip title="Exportar CSV">
          <IconButton
            size="small"
            onClick={() => exportToCSV(filteredRows, exportFilename ?? 'export.csv', exportHeaders)}
          >
            <DownloadIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        {/* Columnas visibles */}
        <Tooltip title="Columnas visibles">
          <IconButton onClick={handleColumnBtnClick} size="small">
            <ViewColumnIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>

      {/* Versión desktop (Menu) */}
      <Menu
        anchorEl={anchorColumns}
        open={Boolean(anchorColumns) && !isMobile}
        onClose={() => setAnchorColumns(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 2,
              px: 2,
              py: 2,
              minWidth: 260,
              maxHeight: '60vh',
              overflowY: 'auto',
            }
          }
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} mb={1} px={1}>
          Columnas visibles
        </Typography>
        <Divider sx={{ mb: 1 }} />

        {columns.map((col) => (
          <MenuItem
            key={col.id}
            onClick={() => toggleColumnVisibility(col.id)}
            dense
            sx={{
              gap: 1,
              py: 1,
              px: 2,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'action.hover',
              }
            }}
          >
            <Checkbox
              checked={visibleColumns.includes(col.id)}
              size="small"
              sx={{ padding: 0.5 }}
            />
            <Typography variant="body2" noWrap>
              {col.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>

      {/* Versión mobile (Dialog de pantalla completa) */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullScreen>
        <DialogTitle>Columnas visibles</DialogTitle>
        <DialogContent dividers>
          {columns.map((col) => (
            <Box
              key={col.id}
              display="flex"
              alignItems="center"
              py={1}
              onClick={() => toggleColumnVisibility(col.id)}
              sx={{ cursor: 'pointer' }}
            >
              <Checkbox
                checked={visibleColumns.includes(col.id)}
                size="small"
                sx={{ paddingRight: 1 }}
              />
              <Typography variant="body1">{col.label}</Typography>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary" variant="contained">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
