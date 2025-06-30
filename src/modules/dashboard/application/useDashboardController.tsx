'use client';

import { useCallback, useEffect, useState } from 'react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

import DashboardService from '../infrastructure/dashboard-service';
import { IDashboardFeature, IDashboardStat } from '../domain/dashboard-model';

const dashboardService = new DashboardService();

export function useDashboardController() {
  const [stats, setStats] = useState<IDashboardStat[]>([]);
  const [features] = useState<IDashboardFeature[]>([
    {
      title: 'Administrar productos',
      description: 'Agrega y actualiza tu inventario de artículos.',
      icon: <Inventory2Icon fontSize="large" color="primary" />,
      href: '/products',
    },
    {
      title: 'Registrar movimientos',
      description: 'Controla entradas y salidas de inventario.',
      icon: <CompareArrowsIcon fontSize="large" color="secondary" />,
      href: '/movements',
    },
    {
      title: 'Registrar ventas',
      description: 'Genera ventas de forma rápida.',
      icon: <PointOfSaleIcon fontSize="large" color="success" />,
      href: '/movements',
    },
    {
      title: 'Cortes de caja',
      description: 'Realiza y consulta cortes diarios.',
      icon: <ReceiptLongIcon fontSize="large" color="info" />,
      href: '/cut-offs',
    },
  ]);

  const getStats = useCallback(async () => {
    // const { data } = await dashboardService.fetchStats();
    // setStats(data);
    // Using static data until API is available
    setStats([
      {
        title: 'Total Ventas',
        value: '$18,420',
        icon: <AttachMoneyIcon fontSize="large" color="primary" />,
      },
      {
        title: 'Usuarios Activos',
        value: '1,280',
        icon: <PeopleIcon fontSize="large" color="secondary" />,
      },
      {
        title: 'Ordenes Completadas',
        value: '845',
        icon: <ShoppingCartIcon fontSize="large" color="success" />,
      },
      {
        title: 'Crecimiento Mensual',
        value: '+12%',
        icon: <TrendingUpIcon fontSize="large" color="info" />,
      },
    ]);
  }, []);

  useEffect(() => {
    getStats();
  }, [getStats]);

  return { stats, features };
}
