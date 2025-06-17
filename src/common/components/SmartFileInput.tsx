'use client'

import React, {
  useState,
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef,
  JSX,
} from 'react'

import {
  Box,
  Typography,
  IconButton,
  Stack,
  Tooltip,
} from '@mui/material'

import UploadIcon from '@mui/icons-material/CloudUpload'
import DeleteIcon from '@mui/icons-material/Delete'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import ImageIcon from '@mui/icons-material/Image'
import DescriptionIcon from '@mui/icons-material/Description'
import TableChartIcon from '@mui/icons-material/TableChart'
import AudioFileIcon from '@mui/icons-material/Audiotrack'
import VideoFileIcon from '@mui/icons-material/OndemandVideo'

export interface SmartFileInputRef {
  isValid: () => boolean
  getValue: () => File[] | string
  validate: () => boolean
}

interface SmartFileInputProps {
  label: string
  allowedTypes?: string[]
  maxSizeMb?: number
  required?: boolean
  multiple?: boolean
  defaultValue?: string
  onChange?: (files: File[]) => void
  disabled?: boolean
}

const fileTypeIcons: Record<string, JSX.Element> = {
  'application/pdf': <PictureAsPdfIcon sx={{ color: 'error.main', fontSize: 32 }} />,
  'application/msword': <DescriptionIcon sx={{ color: 'primary.main', fontSize: 32 }} />,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': <DescriptionIcon sx={{ color: 'primary.main', fontSize: 32 }} />,
  'application/vnd.ms-excel': <TableChartIcon sx={{ color: 'success.main', fontSize: 32 }} />,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': <TableChartIcon sx={{ color: 'success.main', fontSize: 32 }} />,
  'audio/mpeg': <AudioFileIcon sx={{ fontSize: 32 }} />,
  'video/mp4': <VideoFileIcon sx={{ fontSize: 32 }} />,
  'image/': <ImageIcon sx={{ fontSize: 32 }} />,
}

const SmartFileInput = forwardRef<SmartFileInputRef, SmartFileInputProps>(({
  label,
  allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'],
  maxSizeMb = 1,
  required = false,
  multiple = false,
  defaultValue,
  onChange,
  disabled = false
}, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])
  const [remotePreview, setRemotePreview] = useState<string | null>(defaultValue || null)
  const [error, setError] = useState('')
  const [touched, setTouched] = useState(false)

  const openFileSelector = useCallback(() => {
    if (!disabled) {
      inputRef.current?.click()
    }
  }, [disabled])

  const getIconByType = (type: string): JSX.Element => {
    for (const [prefix, icon] of Object.entries(fileTypeIcons)) {
      if (type.startsWith(prefix)) return icon
    }
    return <InsertDriveFileIcon sx={{ fontSize: 32 }} />
  }

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTouched(true)
    const inputFiles = e.target.files
    if (!inputFiles) return

    const fileList = Array.from(inputFiles)
    const validated: File[] = []
    let errorMsg = ''

    for (const file of fileList) {
      if (!allowedTypes.includes(file.type)) {
        errorMsg = `Formato no permitido: ${file.type}`
        break
      }
      if (file.size > maxSizeMb * 1024 * 1024) {
        errorMsg = `Archivo demasiado grande. Máximo ${maxSizeMb}MB`
        break
      }
      validated.push(file)
    }

    if (errorMsg) {
      setFiles([])
      setRemotePreview(null)
      setError(errorMsg)
      return
    }

    setFiles(validated)
    setRemotePreview(null)
    setError('')
    onChange?.(validated)
  }, [allowedTypes, maxSizeMb, onChange])

  const handleDelete = () => {
    if (!disabled) {
      setFiles([])
      setRemotePreview(null)
      setError('')
      onChange?.([])
    }
  }

  useImperativeHandle(ref, () => ({
    isValid: () => !required || !!files.length || !!remotePreview,
    getValue: () => (multiple ? files : files.length > 0 ? [files[0]] : []) || remotePreview || '',
    validate: () => {
      setTouched(true)
      const valid = !required || !!files.length || !!remotePreview
      setError(valid ? '' : 'Este campo es obligatorio')
      return valid
    }
  }))

  return (
    <Box onClick={openFileSelector} sx={{
      display: 'flex',
      gap: 2,
      width: '100%',
      minHeight: 100,
      cursor: disabled ? 'not-allowed' : 'pointer',
      alignItems: 'center',
      px: 2,
      py: 1.5,
      borderRadius: 2,
      bgcolor: disabled ? 'action.disabledBackground' : '#fff',
      border: '1px dashed',
      borderColor: touched && error ? 'error.main' : 'divider',
      transition: '0.2s ease',
      '&:hover': { borderColor: 'primary.main' }
    }}>
      <Box sx={{
        width: 60,
        height: 60,
        backgroundColor: '#f1f1f1',
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {files[0]?.type.startsWith('image/')
          ? <img src={URL.createObjectURL(files[0])} alt="preview" width="60" height="60" style={{ objectFit: 'cover' }} />
          : files[0]
            ? getIconByType(files[0].type)
            : remotePreview
              ? <img src={remotePreview} alt="preview" width="60" height="60" style={{ objectFit: 'cover' }} />
              : <UploadIcon sx={{ fontSize: 32, color: 'text.secondary' }} />
        }
      </Box>

      <Stack spacing={0.5} flex={1}>
        <Typography variant="body2" fontWeight={600}>
          {label}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Extensiones: {allowedTypes.map(t => t.split('/').pop()?.toUpperCase()).join(', ')} · Máx: {maxSizeMb}MB
        </Typography>
        {(files[0]?.name || remotePreview) && (
          <Typography variant="caption" color="text.primary" noWrap maxWidth="100%">
            {files[0]?.name || 'archivo existente'}
          </Typography>
        )}
        {touched && error && (
          <Typography variant="caption" color="error.main">
            {error}
          </Typography>
        )}
      </Stack>

      {(files.length > 0 || remotePreview) && (
        <Tooltip title="Eliminar archivo">
          <IconButton onClick={(e) => { e.stopPropagation(); handleDelete(); }} disabled={disabled}>
            <DeleteIcon color="error" />
          </IconButton>
        </Tooltip>
      )}

      <input
        ref={inputRef}
        type="file"
        hidden
        accept={allowedTypes.join(',')}
        onChange={handleChange}
        multiple={multiple}
        disabled={disabled}
      />
    </Box>
  )
})

export default React.memo(SmartFileInput)

