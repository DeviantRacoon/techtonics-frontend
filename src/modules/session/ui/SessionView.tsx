"use client";

import React, { useEffect, Fragment } from "react";
import Settings from "@mui/icons-material/Settings";

import { SmartTable, Header, ConfirmModal } from "@/common/components";

import { useSessionController } from "../application/useSessionController";
import { useSessionUI } from "../application/useSessionUI";
import { STATUS_SESSION } from "../domain/session-model";

import { getAllowedActions } from "@/common/utils";

export function SessionView() {
  const {
    rows,
    getUsers,
    changeStatus,
  } = useSessionController();

  const {
    selected,
    showConfirmModal,
    handleDelete,
    handleBan,
    handleCloseModal,
  } = useSessionUI();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Fragment>
      <Header
        title="Sesiones"
        description="Administra las sesiones de los usuarios."
        icon={<Settings fontSize="large" color="primary" />}
      />

      <SmartTable
        exportFilename="reporte-sesiones.csv"
        rows={rows}
        columns={[
          { id: "user.username", label: "Usuario" },
          { id: "ip", label: "Dirección IP" },
          { id: "device", label: "Origen", size: "xl" },
          { id: "status", label: "Estatus", type: "status", size: "xs" },
          { id: "createdAt", label: "Inicio de sesión", type: "datetime" },
          { id: "expiresAt", label: "Fin de sesión", type: "datetime" },
        ]}
        actions={[
          {
            label: "Ban",
            hidden: !getAllowedActions("user_edit"),
            icon: <img src="/assets/svg/ban-outline.svg" alt="active" width="20" />,
            onClick: handleBan
          },
          {
            label: "Eliminar",
            hidden: !getAllowedActions("user_edit"),
            icon: <img src="/assets/svg/trash-outline.svg" alt="delete" width="20" />,
            onClick: handleDelete
          },
        ]}
      />

      <ConfirmModal
        {...showConfirmModal}
        onClose={handleCloseModal}
        onConfirm={() => {
          const status = showConfirmModal.title === "Banear usuario" ? STATUS_SESSION.BAN : STATUS_SESSION.DELETED;
          changeStatus(selected, status, handleCloseModal);
        }}
      />
    </Fragment>
  );
}
