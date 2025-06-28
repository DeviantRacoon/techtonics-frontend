'use client'

import React, { useMemo } from 'react'
import {
  Box,
  Stack,
  Typography,
  Paper,
  Breadcrumbs,
  useMediaQuery,
  useTheme,
  Link as MuiLink
} from '@mui/material'


import NavigateNextIcon from '@mui/icons-material/NavigateNext'

export interface SmartHeaderProps {
  icon: React.ReactNode
  title: string
  description?: string
  actions?: React.ReactNode
  breadcrumbs?: { label: string; href?: string }[]
}

export default function Header({
  icon,
  title,
  description,
  actions,
  breadcrumbs
}: SmartHeaderProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const IconWrapper = useMemo(() => (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius={1}
      bgcolor="primary.100"
      color="primary.main"
      width={52}
      height={52}
      mr={2}>
      {icon}
    </Box>
  ), [icon])

  return (
    <Paper
      elevation={1}
      sx={{
        borderRadius: 1,
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(3),
        mb: 3,
        backgroundColor: 'background.paper'
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
        spacing={2}
      >
        <Box flex={1}>
          <Stack direction="row" alignItems="center">
            {IconWrapper}
            <Box>
              <Typography variant="h4" fontWeight={700} lineHeight={1.2}>
                {title}
              </Typography>
              {description && (
                <Typography variant="body2" color="text.secondary" mt={0.5}>
                  {description}
                </Typography>
              )}
            </Box>
          </Stack>

          {breadcrumbs && breadcrumbs.length > 0 && (
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              sx={{ mt: 2 }}
            >
              {breadcrumbs.map((crumb) => (
                crumb.href ? (
                  <MuiLink key={crumb.href} href={crumb.href} underline="hover" color="inherit">
                    {crumb.label}
                  </MuiLink>
                ) : (
                  <Typography key={crumb.label} color="text.primary">
                    {crumb.label}
                  </Typography>
                )
              ))}
            </Breadcrumbs>
          )}
        </Box>

        {actions && (
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            justifyContent={isMobile ? 'flex-start' : 'flex-end'}
            width={{ xs: '100%', sm: 'auto' }}
          >
            {actions}
          </Stack>
        )}
      </Stack>
    </Paper>
  )
}
