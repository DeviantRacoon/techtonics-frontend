'use client'

import React from 'react'
import { Box, Paper, Typography } from '@mui/material'

import Grid from '@mui/material/GridLegacy'

import TrendingUpIcon from '@mui/icons-material/TrendingUp'

import Link from 'next/link'

import { Header, SmartButton } from '@/common/components'
import { useDashboardController } from '../application/useDashboardController'



export function DashboardView() {
  const { stats, features } = useDashboardController();
  return (
    <>
      <Header
        icon={<TrendingUpIcon fontSize="large" color="primary" />}
        title="Panel de control"
        description="Resumen general del rendimiento de tu sistema"
      />

      <Grid container spacing={2} mb={4}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Paper
              elevation={3}
              sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box>{stat.icon}</Box>
              <Box>
                <Typography variant="body2" color="text.secondary">{stat.title}</Typography>
                <Typography variant="h6" fontWeight={700}>{stat.value}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" fontWeight={700} mb={2}>
        Accesos rápidos
      </Typography>
      <Grid container spacing={2}>
        {features.map((feature) => (
          <Grid item xs={12} sm={6} md={3} key={feature.title}>
            <Paper
              elevation={1}
              sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1, height: '100%' }}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                {feature.icon}
                <Typography variant="subtitle1" fontWeight={600}>
                  {feature.title}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" flex={1}>
                {feature.description}
              </Typography>
              <Link href={feature.href} passHref>
                <SmartButton label="Ir al módulo" variant="outlined" />
              </Link>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

