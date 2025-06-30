'use client'

import React from 'react'
import {
  Box,
  Paper,
  Typography,
  useTheme,
} from '@mui/material'

import Grid from '@mui/material/GridLegacy'

import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import PeopleIcon from '@mui/icons-material/People'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import PointOfSaleIcon from '@mui/icons-material/PointOfSale'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'

import Link from 'next/link'

import { Header, SmartButton } from '@/common/components'
import RootLayout from '@/common/components/ui/Layout'


const stats = [
  {
    title: 'Total Ventas',
    value: '$18,420',
    icon: <AttachMoneyIcon fontSize="large" color="primary" />
  },
  {
    title: 'Usuarios Activos',
    value: '1,280',
    icon: <PeopleIcon fontSize="large" color="secondary" />
  },
  {
    title: 'Ordenes Completadas',
    value: '845',
    icon: <ShoppingCartIcon fontSize="large" color="success" />
  },
  {
    title: 'Crecimiento Mensual',
    value: '+12%',
    icon: <TrendingUpIcon fontSize="large" color="info" />
  }
]

const features = [
  {
    title: 'Administrar productos',
    description: 'Agrega y actualiza tu inventario de artículos.',
    icon: <Inventory2Icon fontSize="large" color="primary" />,
    href: '/products'
  },
  {
    title: 'Registrar movimientos',
    description: 'Controla entradas y salidas de inventario.',
    icon: <CompareArrowsIcon fontSize="large" color="secondary" />,
    href: '/movements'
  },
  {
    title: 'Registrar ventas',
    description: 'Genera ventas de forma rápida.',
    icon: <PointOfSaleIcon fontSize="large" color="success" />,
    href: '/movements'
  },
  {
    title: 'Cortes de caja',
    description: 'Realiza y consulta cortes diarios.',
    icon: <ReceiptLongIcon fontSize="large" color="info" />,
    href: '/cut-offs'
  }
]

export default function DashboardPage() {

  return (
    <RootLayout>
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
    </RootLayout>
  )
}
