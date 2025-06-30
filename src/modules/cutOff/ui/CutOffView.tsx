"use client";

import React, { useEffect, Fragment } from "react";

import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import ArchiveIcon from '@mui/icons-material/Archive';

import { SmartTable, Header, ConfirmModal, ThemedIcon, SmartButton } from "@/common/components";

import ModalCutOffView from "./ModalCutOffView";

import { useCutOffController } from "../application/useCutOffController";
import { useCutOffUI } from "../application/useCutOffUI";

import { getAllowedActions } from "@/common/utils";

export function CutOffView() {
  const { rows, loading, getCutOffs, createCutOff, deleteCutOff } = useCutOffController();
  const exampleShiftData = {
    cutOffDate: "2023-06-01",
    stockExits: 20,
    totalRevenue: 1000,
    stockEntries: 30,
    stockOutputs: 40
  };


  const {
    selected,
    showModalForm,
    showConfirmModal,
    handleCreate,
    handleDelete,
    handleCloseModal,
  } = useCutOffUI();

  useEffect(() => {
    getCutOffs();
  }, [getCutOffs]);

  return (
    <Fragment>
      <Header
        title="Cortes"
        description="Administra los cortes de productos."
        icon={<FolderCopyIcon fontSize="large" color="primary" />}
        actions={
          <SmartButton
            label="Agregar corte"
            variant="contained"
            leftIcon={<ArchiveIcon />}
            onClick={handleCreate}
          />
        }
      />

      <SmartTable
        loading={loading}
        filters={[
          {
            id: "status",
            label: "Estatus",
            type: "select",
            options: [
              { value: "ACTIVO", label: "Activo" },
              { value: "ELIMINADO", label: "Eliminado" },
            ],
          }
        ]}
        exportFilename="reporte-cortes-productos.csv"
        rows={rows}
        columns={[
          { id: "cutOffType", label: "Tipo", align: "left", size: "sm" },
          { id: "quantity", label: "Cantidad", size: "xs" },
          { id: "product.productName", label: "Producto", align: "center" },
          { id: "user.username", label: "Responsable" },
          { id: "cutoffDate", label: "Fecha corte", type: "date" },
        ]}
        actions={[
          {
            label: "Eliminar",
            hidden: !getAllowedActions("cut_off_edit"),
            icon: <ThemedIcon src="/assets/svg/trash-outline.svg" alt="delete" width={20} />,
            onClick: handleDelete
          },
        ]}
      />

      <ConfirmModal
        {...showConfirmModal}
        onClose={handleCloseModal}
        onConfirm={() => deleteCutOff(selected.cutOffId, handleCloseModal)}
      />

      {showModalForm.isOpen && (
        <ModalCutOffView isOpen={showModalForm.isOpen} onSubmit={() => createCutOff(selected, handleCloseModal)} onClose={handleCloseModal} data={exampleShiftData} />
      )}
    </Fragment>
  );
}

