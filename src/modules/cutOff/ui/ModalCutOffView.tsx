"use client";

import React from "react";
import Grid from "@mui/material/GridLegacy";

import {
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Box,
} from "@mui/material";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import OutboxIcon from "@mui/icons-material/Outbox";

import { Modal, SmartButton } from "@/common/components";
import { formatCurrency } from "@/common/utils";
import { IDataModalCutOff } from "../domain/cut-off-model";

const MetricCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) => {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        flex: 1,
        boxShadow: "none",
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          {icon}
          <Box>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h6" fontWeight={700} color="text.primary">
              {value}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default function CashReconciliationViewModal({
  isOpen,
  onClose,
  onSubmit,
  loading,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  loading?: boolean;
  data: IDataModalCutOff; 
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Modal isOpen={isOpen} noIconClose onClose={onClose} size="lg">
      <Stack spacing={1} mb={3}>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          Resumen de Cierre de Caja
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Mostrando el resumen para el período del{" "}
          <b>{data.cutOffDate}</b>
        </Typography>
      </Stack>

      <Grid container spacing={2} mb={4}>
        <Grid item xs={12}>
          <MetricCard
            title="Ingresos Totales"
            value={formatCurrency(data.totalRevenue)}
            icon={<TrendingUpIcon color="success" />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MetricCard
            title="Entradas Stock"
            value={data.stockEntries}
            icon={<Inventory2Icon color="info" />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MetricCard
            title="Salidas Stock"
            value={data.stockExits}
            icon={<OutboxIcon color="warning" />}
          />
        </Grid>
      </Grid>

      <Stack
        direction={isMobile ? "column-reverse" : "row"}
        spacing={1.5}
        justifyContent="flex-end"
      >
        <SmartButton
          label="Cerrar"
          variant="outlined"
          onClick={onClose}
          loading={loading}
          fullWidth={isMobile}
        />
        <SmartButton
          label="Confirmar y Finalizar Corte"
          variant="contained"
          loading={loading}
          onClick={onSubmit}
          fullWidth={isMobile}
        />
      </Stack>
    </Modal>
  );
}
