import React from 'react'
import {
  Button, Divider, FormControl, InputLabel, Popover, MenuItem, Select, Typography
  , TextField, Checkbox, FormControlLabel, Stack
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import type { FilterDefinition } from '../SmartTable/types'

interface Props {
  open: boolean
  anchorEl: HTMLElement | null
  onClose: () => void
  filters: FilterDefinition[]
  activeFilters: Record<string, string>
  onFilterSelect: (label: string, value: string) => void
  onClearFilters: () => void
  isMobile: boolean
}

export default function SmartFilterMenu({
  open,
  anchorEl,
  onClose,
  filters,
  activeFilters,
  onFilterSelect,
  onClearFilters,
  isMobile
}: Props) {
  const hasActiveFilters = Object.values(activeFilters).some(Boolean)

  const renderFilterField = (filter: FilterDefinition) => {
    const value = activeFilters[filter.id] ?? '';

    switch (filter.type ?? 'select') {
      case 'select':
        return (
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel>{filter.label}</InputLabel>
            <Select
              value={value}
              onChange={(e) => onFilterSelect(filter.id, e.target.value)}
              label={filter.label}>
              <MenuItem value="" disabled>Seleccione una opción</MenuItem>
              {filter.options?.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case 'checkbox':
        return (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Typography fontWeight={600} mb={1}>{filter.label}</Typography>
            <Stack spacing={1}>
              {filter.options?.map(opt => (
                <FormControlLabel
                  key={opt.value}
                  control={
                    <Checkbox
                      checked={(value?.split(',') ?? []).includes(opt.value)}
                      onChange={(e) => {
                        const current = new Set(value.split(',').filter(Boolean));
                        e.target.checked ? current.add(opt.value) : current.delete(opt.value);
                        onFilterSelect(filter.id, Array.from(current).join(','));
                      }}
                    />
                  }
                  label={opt.label}
                />
              ))}
            </Stack>
          </FormControl>
        );

      case 'date':
        return (
          <TextField
            label={filter.label}
            type="date"
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            value={value}
            onChange={(e) => onFilterSelect(filter.id, e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        );

      case 'daterange':
        return (
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <TextField
              label="Desde"
              type="date"
              size="small"
              fullWidth
              value={value.split('|')[0] ?? ''}
              onChange={(e) => {
                const to = value.split('|')[1] ?? '';
                onFilterSelect(filter.id, `${e.target.value}|${to}`);
              }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Hasta"
              type="date"
              size="small"
              fullWidth
              value={value.split('|')[1] ?? ''}
              onChange={(e) => {
                const from = value.split('|')[0] ?? '';
                onFilterSelect(filter.id, `${from}|${e.target.value}`);
              }}
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
        );

      case 'text':
        return (
          <TextField
            label={filter.label}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            value={value}
            onChange={(e) => onFilterSelect(filter.id, e.target.value)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Popover
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          borderRadius: 3,
          px: 3,
          py: 3,
          minWidth: isMobile ? '90vw' : 400,
          maxWidth: '90vw',
          boxShadow: 6,
          bgcolor: 'background.paper',
          maxHeight: '80vh',
          overflowY: 'auto'
        }
      }}>
      <Typography variant="h6" fontWeight={600} mb={1}>Filtrar resultados</Typography>
      <Divider sx={{ mb: 2 }} />

      {filters.map((filter) => (
        <React.Fragment key={filter.id}>
          {renderFilterField(filter)}
        </React.Fragment>
      ))}

      {hasActiveFilters && (
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          startIcon={<CloseIcon />}
          onClick={onClearFilters}>
          Limpiar filtros
        </Button>
      )}
    </Popover>
  )
}
