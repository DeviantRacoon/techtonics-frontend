'use client'

import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react'
import {
  Dialog,
  DialogContent,
  InputAdornment,
  OutlinedInput,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from '@mui/material'
import { alpha } from '@mui/material/styles'

import SearchIcon from '@mui/icons-material/Search'
import { useRouter } from 'next/navigation'
import { modulesList } from '@/config/routes'
import { getCurrentUser } from '@/common/utils'
import { IMenuItem } from '@/common/models'

const stopwords = [
  'el',
  'la',
  'los',
  'las',
  'un',
  'una',
  'unos',
  'unas',
  'de',
  'del',
  'al',
  'y',
  'o',
  'en',
  'que',
]

const normalize = (str: string) =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

const stem = (word: string) =>
  word.replace(/(es|s)$/u, '')

const tokenize = (str: string) =>
  normalize(str)
    .split(/\s+/)
    .filter((t) => t && !stopwords.includes(t))
    .map(stem)

const levenshtein = (a: string, b: string) => {
  const matrix: number[][] = []
  const m = a.length
  const n = b.length
  for (let i = 0; i <= m; i++) {
    matrix[i] = [i]
  }
  for (let j = 0; j <= n; j++) {
    matrix[0][j] = j
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      )
    }
  }
  return matrix[m][n]
}

const isClose = (a: string, b: string) => {
  if (a.includes(b) || b.includes(a)) return true
  return levenshtein(a, b) <= 1
}

interface CommandDialogProps {
  open: boolean
  onClose: () => void
}

interface FlatMenuItem {
  label: string
  link: string
  description?: string
  keywords?: string[]
  icon?: React.ReactElement
  /** tokens generados para búsqueda */
  tokens: string[]
}

export default function CommandDialog({ open, onClose }: CommandDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)

  const offline = process.env.NEXT_PUBLIC_OFFLINE_MODE === 'true'

  const userModules = useMemo(() => {
    if (offline) return modulesList

    const currentUser = getCurrentUser()
    if (!currentUser) return []

    const hasPermission = (perm?: string) =>
      currentUser.allowedPermissions.includes(perm ?? '')

    const modules = modulesList.filter(
      (item) =>
        !item.submenu &&
        (hasPermission(item.permission) || item.permission === 'dashboard')
    )

    const subModules = modulesList
      .filter((item) => Array.isArray(item.submenu))
      .map((item) => {
        const filtered = item.submenu!.filter((sub) => hasPermission(sub.permission))
        return filtered.length > 0 ? { ...item, submenu: filtered } : null
      })
      .filter(Boolean) as IMenuItem[]

    return [...modules, ...subModules]
  }, [offline])

  const flatMenu: FlatMenuItem[] = useMemo(() => {
    const items: FlatMenuItem[] = []

    for (const item of userModules) {
      if (item?.submenu && item.submenu.length > 0) {
        for (const sub of item.submenu) {
          const tokens = tokenize(
            [sub.label, sub.description, ...(sub.keywords ?? [])].join(' '),
          )
          items.push({
            label: sub.label,
            link: sub.link,
            description: sub.description,
            keywords: sub.keywords,
            icon: item.icon,
            tokens,
          })
        }
      } else if (item?.link) {
        const tokens = tokenize(
          [item.label, item.description, ...(item.keywords ?? [])].join(' '),
        )
        items.push({
          label: item.label,
          link: item.link,
          description: item.description,
          keywords: item.keywords,
          icon: item.icon,
          tokens,
        })
      }
    }

    return items
  }, [userModules])

  const filteredItems = useMemo(() => {
    const tokens = tokenize(query)

    if (tokens.length === 0) return flatMenu

    return flatMenu.filter((item) =>
      tokens.every((token) =>
        item.tokens.some((t) => isClose(t, token)),
      ),
    )
  }, [query, flatMenu])

  const handleNavigate = useCallback((link: string) => {
    onClose()
    router.push(link)
  }, [router, onClose])

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!open) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHighlightedIndex((prev) =>
          (prev + 1) % filteredItems.length
        )
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHighlightedIndex((prev) =>
          (prev - 1 + filteredItems.length) % filteredItems.length
        )
      } else if (e.key === 'Enter' && highlightedIndex >= 0) {
        e.preventDefault()
        handleNavigate(filteredItems[highlightedIndex].link)
      } else if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, filteredItems, highlightedIndex, handleNavigate, onClose])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      keepMounted
      PaperProps={{
        sx: (theme) => ({
          mt: 10,
          borderRadius: 3,
          backdropFilter: 'blur(12px)',
          backgroundColor: alpha(theme.palette.background.paper, 0.9),
          boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
          p: 2,
        }),
      }}
    >
      <DialogContent sx={{ px: 0 }}>
        <OutlinedInput
          inputRef={inputRef}
          fullWidth
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setHighlightedIndex(-1)
          }}
          placeholder="Buscar acciones o módulos..."
          sx={{
            borderRadius: 2,
            mb: 2,
            backgroundColor: 'background.paper',
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />

        <List dense disablePadding>
          {filteredItems.map((item, idx) => (
            <ListItem
              key={item.link}
              component={'li'}
              onMouseEnter={() => setHighlightedIndex(idx)}
              onClick={() => handleNavigate(item.link)}
              sx={{
                px: 2,
                py: 1.3,
                transition: 'all 0.2s ease',
                backgroundColor: idx === highlightedIndex ? 'action.selected' : undefined,
                ...(idx === highlightedIndex && {
                  backgroundColor: 'action.selected',
                }),
              }}>
              {
                item.icon && (
                  <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                )
              }
              < ListItemText
                primary={
                  < Typography variant="body2" fontWeight={600} >
                    {item.label}
                  </Typography>
                }
                secondary={
                  item.description && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.description}
                    </Typography>
                  )
                }
              />
            </ListItem>
          ))}

          {filteredItems.length === 0 && (
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="body2" color="text.secondary">
                No se encontraron resultados.
              </Typography>
            </Box>
          )}
        </List>
      </DialogContent >
    </Dialog >
  )
}
