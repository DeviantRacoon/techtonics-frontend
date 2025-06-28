"use client";

import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Avatar,
  Autocomplete,
  Divider,
  Stack,
  LinearProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { parseISO } from "date-fns";
import CloseIcon from "@mui/icons-material/Close";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import OutboxIcon from "@mui/icons-material/Outbox";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import { Modal, SmartButton, ConfirmModal } from "@/common/components";

interface MetricCardProps {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
}

function MetricCard({ title, value, icon }: MetricCardProps) {
  return (
    <Card sx={{ flex: 1 }}>
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
}

interface UserOption {
  id: number;
  name: string;
  avatar: string;
}

interface ShiftData {
  totalRevenue: number;
  itemsSold: number;
  stockEntries: number;
  stockExits: number;
  expectedCash: number;
}

interface ModalCutOffViewProps {
  isOpen: boolean;
  onClose: () => void;
  shiftData: ShiftData;
}

export default function CashReconciliationModal({
  isOpen,
  onClose,
  shiftData,
}: ModalCutOffViewProps) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [selectedUser, setSelectedUser] = useState<UserOption | null>(null);
  const [actualCash, setActualCash] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [tabValue, setTabValue] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  const users: UserOption[] = useMemo(
    () => [
      {
        id: 1,
        name: "John Doe",
        avatar:
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=32&h=32&auto=format&dpr=2",
      },
      {
        id: 2,
        name: "Jane Smith",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&auto=format&dpr=2",
      },
    ],
    []
  );

  const discrepancy = actualCash
    ? Number(actualCash) - shiftData.expectedCash
    : 0;

  const handleFinalize = () => setShowConfirm(true);

  const handleConfirm = () => {
    setShowConfirm(false);
    onClose();
  };

  const renderFinancialSummary = () => (
    <Box>
      <Box mb={2}>
        <Typography variant="body2" color="text.secondary">
          Revenue breakdown
        </Typography>
        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <Typography variant="caption" sx={{ minWidth: 90 }}>
            Products
          </Typography>
          <LinearProgress
            variant="determinate"
            value={70}
            sx={{ flex: 1, mr: 1 }}
          />
          <Typography variant="caption">70%</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <Typography variant="caption" sx={{ minWidth: 90 }}>
            Services
          </Typography>
          <LinearProgress
            variant="determinate"
            value={30}
            sx={{ flex: 1, mr: 1 }}
            color="secondary"
          />
          <Typography variant="caption">30%</Typography>
        </Box>
      </Box>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell>Total Sales</TableCell>
            <TableCell align="right" sx={{ color: "success.main" }}>
              + ${shiftData.totalRevenue.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cost of Goods Sold</TableCell>
            <TableCell align="right" sx={{ color: "error.main" }}>
              - $4,120.50
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Registered Expenses</TableCell>
            <TableCell align="right" sx={{ color: "error.main" }}>
              - $300.00
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>
              <Divider sx={{ my: 1 }} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography fontWeight={700}>Gross Profit</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography fontWeight={700}>
                ${ (shiftData.totalRevenue - 4120.5 - 300).toFixed(2) }
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );

  const renderInventoryMovements = () => (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle2" gutterBottom>
          Entries
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Unit Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Product A</TableCell>
              <TableCell>Warehouse</TableCell>
              <TableCell align="right">10</TableCell>
              <TableCell align="right">$100</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle2" gutterBottom>
          Exits
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Sale Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Product B</TableCell>
              <TableCell>Sale</TableCell>
              <TableCell align="right">5</TableCell>
              <TableCell align="right">$80</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );

  const renderCashVerification = () => (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="System Expected Cash"
          value={`$${shiftData.expectedCash.toFixed(2)}`}
          InputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Actual Cash Count"
          type="number"
          value={actualCash}
          onChange={(e) => setActualCash(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Discrepancy"
          value={`$${discrepancy.toFixed(2)}`}
          InputProps={{ readOnly: true, endAdornment: discrepancy !== 0 ? <WarningAmberIcon color="warning" /> : undefined }}
          sx={{
            "& .MuiInputBase-input": {
              color: discrepancy === 0 ? "success.main" : "error.main",
            },
          }}
        />
      </Grid>
    </Grid>
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg" noIconClose>
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight={700} color="text.primary">
              End of Period Reconciliation
            </Typography>
            <IconButton onClick={onClose} size="small" aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>

          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newVal) => setStartDate(newVal ?? null)}
                slotProps={{ textField: { fullWidth: true } }}
              />
              <Box mt={2}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newVal) => setEndDate(newVal ?? null)}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={users}
                getOptionLabel={(option) => option.name}
                value={selectedUser}
                onChange={(_, value) => setSelectedUser(value)}
                renderInput={(params) => (
                  <TextField {...params} label="Responsible User" fullWidth />
                )}
                renderOption={(props, option) => (
                  <Box component="li" {...props} display="flex" alignItems="center">
                    <Avatar src={option.avatar} sx={{ mr: 1 }} />
                    {option.name}
                  </Box>
                )}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard
                title="Total Revenue"
                value={`$${shiftData.totalRevenue.toFixed(2)}`}
                icon={<TrendingUpIcon color="success" />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard
                title="Items Sold"
                value={shiftData.itemsSold}
                icon={<ShoppingBagIcon color="action" />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard
                title="Stock Entries"
                value={shiftData.stockEntries}
                icon={<Inventory2Icon color="action" />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard
                title="Stock Exits"
                value={shiftData.stockExits}
                icon={<OutboxIcon color="action" />}
              />
            </Grid>
          </Grid>

          <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
            <Tab label="Financial Summary" />
            <Tab label="Inventory Movements" />
            <Tab label="Cash Verification" />
          </Tabs>
          <Box mt={2}>
            {tabValue === 0 && renderFinancialSummary()}
            {tabValue === 1 && renderInventoryMovements()}
            {tabValue === 2 && renderCashVerification()}
          </Box>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={12} md={8}>
              <TextField
                label={discrepancy === 0 ? "Notes for this period (optional)" : "Notes (Required)"}
                multiline
                minRows={3}
                fullWidth
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                error={discrepancy !== 0 && notes.trim() === ""}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1} justifyContent="flex-end">
                <SmartButton label="Export Summary" variant="outlined" onClick={() => {}} fullWidth />
                <SmartButton label="Save Draft" variant="outlined" onClick={() => {}} fullWidth />
                <SmartButton
                  label="Confirm & Finalize Period"
                  variant="contained"
                  onClick={handleFinalize}
                  disabled={!selectedUser || !actualCash}
                  fullWidth
                />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        title="Are you sure?"
        message="This action is irreversible and will close the current accounting period."
        confirmText="Yes, Finalize Period"
        cancelText="Cancel"
        variant="warning"
      />
    </>
  );
}
