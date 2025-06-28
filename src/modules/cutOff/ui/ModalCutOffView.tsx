"use client"

import React, { useState } from "react";
import {
  Typography,
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
} from "@mui/material";

import { Modal, SmartButton, ConfirmModal } from "@/common/components";

interface ShiftData {
  productsIn: number;
  productsOut: number;
  moneyIn: number;
  responsibleUser: string;
}

interface ModalCutOffViewProps {
  isOpen: boolean;
  onClose: () => void;
  shiftData: ShiftData;
}

function StatCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Card sx={{ flex: 1 }}>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h6" fontWeight={700} color="text.primary">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function ModalCutOffView({
  isOpen,
  onClose,
  shiftData,
}: ModalCutOffViewProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showConfirm, setShowConfirm] = useState(false);

  const handleFinalize = () => setShowConfirm(true);
  const handleConfirm = () => {
    setShowConfirm(false);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg" noIconClose>
        <Stack spacing={3}>
          <Stack spacing={0.5}>
            <Typography variant="h6" fontWeight={700} color="text.primary">
              Corte de jornada
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Revisa la información antes de confirmar el corte.
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 3 }}
          >
            <StatCard label="Productos ingresados" value={shiftData.productsIn} />
            <StatCard label="Productos retirados" value={shiftData.productsOut} />
            <StatCard
              label="Dinero en caja"
              value={`$${shiftData.moneyIn.toFixed(2)}`}
            />
            <StatCard
              label="Responsable"
              value={shiftData.responsibleUser}
            />
          </Stack>

          <Divider />

          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={1}
            justifyContent="flex-end"
          >
            <SmartButton
              label="Cancelar"
              variant="outlined"
              onClick={onClose}
              fullWidth={isMobile}
            />
            <SmartButton
              label="Confirmar corte"
              variant="contained"
              onClick={handleFinalize}
              fullWidth={isMobile}
              sx={!isMobile ? { flex: 1 } : undefined}
            />
          </Stack>
        </Stack>
      </Modal>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        title="Confirmar corte"
        message="Se finalizará la jornada y se guardará la información."
      />
    </>
  );
}
