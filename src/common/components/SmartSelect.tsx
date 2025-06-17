'use client'

import React, {
  useId,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useMemo
} from 'react'

import {
  Autocomplete,
  TextField,
  Box,
  IconButton,
  InputAdornment,
  Chip,
  Typography,
  Stack
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import Modal from './Modal'

export interface SmartSelectRef {
  isValid: () => boolean
  getValue: () => string | string[]
  validate: () => boolean
}

export interface Option {
  label: string
  value: string
}

interface SmartSelectProps {
  name?: string
  label?: string
  placeholder?: string
  required?: boolean
  defaultValue?: string | string[]
  options: Option[]
  size?: 'small' | 'medium'
  fullWidth?: boolean
  helperText?: string
  onChange?: (value: string | string[]) => void
  className?: string
  multiple?: boolean
  maxVisibleTags?: number
  disabled?: boolean
}

const SmartSelectComponent = forwardRef<SmartSelectRef, SmartSelectProps>((props, ref) => {
  const {
    name,
    label,
    placeholder,
    required = false,
    defaultValue = '',
    options,
    size = 'medium',
    fullWidth = true,
    helperText = '',
    onChange,
    className,
    multiple = false,
    maxVisibleTags = 3,
    disabled = false
  } = props

  const autoId = useId()
  const generatedId = (label || placeholder || autoId).toLowerCase().replace(/\s+/g, '-')

  const normalizedDefault = useMemo(() => {
    if (multiple && Array.isArray(defaultValue)) {
      return options.filter((opt) => defaultValue.includes(opt.value))
    }
    
    if (!multiple) {
      return options.find((opt) => opt.value === defaultValue) || null
    }
    return multiple ? [] : null
  }, [defaultValue, options, multiple])

  const [value, setValue] = useState<Option[] | Option | null>(normalizedDefault)
  const [error, setError] = useState('')
  const [touched, setTouched] = useState(false)
  const [showOverflowModal, setShowOverflowModal] = useState(false)

  useEffect(() => {
    setValue(normalizedDefault)
  }, [normalizedDefault])

  const filteredOptions = useMemo(() => {
    if (!multiple || !Array.isArray(value)) return options
    const selectedValues = value.map((v) => v.value)
    return options.filter((opt) => !selectedValues.includes(opt.value))
  }, [options, value, multiple])

  const validate = useCallback((val: any): boolean => {
    const isEmpty = multiple
      ? !val || (Array.isArray(val) && val.length === 0)
      : !val || !val.value

    if (required && isEmpty) {
      setError('Este campo es obligatorio')
      return false
    }

    setError('')
    return true
  }, [required, multiple])

  const handleChange = useCallback(
    (_: any, newValue: any) => {
      setValue(newValue)
      validate(newValue)

      if (multiple && Array.isArray(newValue)) {
        onChange?.(newValue.map((opt) => opt.value))
      } else if (!multiple && newValue) {
        onChange?.(newValue.value)
      } else {
        onChange?.(multiple ? [] : '')
      }
    },
    [onChange, multiple, validate]
  )

  const handleClear = useCallback(() => {
    const cleared = multiple ? [] : null
    setValue(cleared)
    setTouched(true)
    onChange?.(multiple ? [] : '')
  }, [onChange, multiple])

  const handleRemoveFromModal = useCallback((valToRemove: string) => {
    const newValue = (value as Option[]).filter(opt => opt.value !== valToRemove)
    setValue(newValue)
    validate(newValue)
    onChange?.(newValue.map(v => v.value))
  }, [value, onChange, validate])

  useImperativeHandle(ref, () => ({
    isValid: () => error === '',
    getValue: () => {
      if (multiple && Array.isArray(value)) return value.map((v) => v.value)
      if (!multiple && value && !Array.isArray(value)) return value.value
      return multiple ? [] : ''
    },
    validate: () => {
      setTouched(true)
      return validate(value)
    }
  }))

  const shouldShrink = !!label && (!!value || touched)

  return (
    <Box className={className}>
      <Autocomplete
        id={generatedId}
        options={filteredOptions}
        multiple={multiple}
        getOptionLabel={(option) => option.label}
        value={value as any}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        isOptionEqualToValue={(option, val) => option.value === val.value}
        clearOnEscape
        autoHighlight
        noOptionsText="Sin resultados"
        disableClearable={!multiple}
        fullWidth={fullWidth}
        disabled={disabled}
        renderTags={(tagValue, getTagProps) => {
          const visibleTags = tagValue.slice(0, maxVisibleTags)
          const hiddenTags = tagValue.length > maxVisibleTags ? tagValue.slice(maxVisibleTags) : []

          return [
            ...visibleTags.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option.value}
                label={option.label}
                sx={{ borderRadius: 1 }}
                color="primary"
                variant="outlined"
              />
            )),
            hiddenTags.length > 0 && (
              <Chip
                key="more"
                label={`+${hiddenTags.length} más`}
                sx={{ borderRadius: 1 }}
                color="secondary"
                variant="outlined"
                onClick={() => setShowOverflowModal(true)}
              />
            )
          ]
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            label={label}
            error={!!error && touched}
            helperText={(touched && error) || helperText}
            size={size}
            fullWidth={fullWidth}
            placeholder={placeholder}
            disabled={disabled}
            InputLabelProps={{
              shrink: shouldShrink || params.inputProps?.value !== '',
              sx: { color: 'text.primary' }
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {!multiple && value && (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Limpiar selección"
                        onClick={handleClear}
                        edge="end"
                        size="small"
                        disabled={disabled}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  )}
                  {params.InputProps.endAdornment}
                </>
              )
            }}
          />
        )}
      />

      {multiple && Array.isArray(value) && (
        <Modal isOpen={showOverflowModal} onClose={() => setShowOverflowModal(false)} size="sm">
          <Typography variant="h6" mb={2}>Elementos seleccionados</Typography>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {value.map(opt => (
              <Chip
                key={opt.value}
                label={opt.label}
                onDelete={() => handleRemoveFromModal(opt.value)}
                color="primary"
                variant="outlined"
              />
            ))}
          </Stack>
        </Modal>
      )}
    </Box>
  )
})

SmartSelectComponent.displayName = 'SmartSelect'
export default React.memo(SmartSelectComponent)

