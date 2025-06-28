"use client";

import React, { useEffect, Fragment } from "react";

import BusinessIcon from "@mui/icons-material/Business";
import AddIcon from "@mui/icons-material/Add";

import { SmartTable, Header, ConfirmModal, ThemedIcon, SmartButton, ModalForm } from "@/common/components";

import { useBusinessUnitController } from "../application/useBusinessUnitController";
import { useBusinessUnitUI } from "../application/useBusinessUnitUI";

import { getAllowedActions } from "@/common/utils";

export function BusinessUnitView() {
  const { rows, loading, getBusinessUnits, createBusinessUnit, deleteBusinessUnit } = useBusinessUnitController();

  const {
    selected,
    showModalForm,
    showConfirmModal,
    handleDelete,
    handleCloseModal,
    handleCreate,
    handleEdit
  } = useBusinessUnitUI();

  useEffect(() => {
    getBusinessUnits();
  }, [getBusinessUnits]);

  return (
    <Fragment>
      <Header
        title="Unidades de negocio"
        description="Administra las unidades de negocio."
        icon={<BusinessIcon fontSize="large" color="primary" />}
        actions={
          <SmartButton
            label="Agregar unidad de negocio"
            variant="contained"
            leftIcon={<AddIcon />}
            hidden={!getAllowedActions('business_unit_create')}
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
        exportFilename="reporte-unidades-negocio.csv"
        rows={rows}
        columns={[
          { id: "businessUnitLogo", label: "", type: "image", size: "xs" },
          { id: "businessUnitName", label: "Nombre" },
          { id: "businessUnitEmail", label: "Correo electrónico" },
          { id: "status", label: "Estatus", type: "status", size: "xs" },
          { id: "createdAt", label: "Fecha de creación", type: "datetime" },
        ]}
        actions={[
          {
            label: "Editar",
            hidden: !getAllowedActions("business_unit_edit"),
            icon: <ThemedIcon src="/assets/svg/create-outline.svg" alt="edit" width={20} />,
            onClick: handleEdit
          },
          {
            label: "Eliminar",
            hidden: !getAllowedActions("business_unit_edit"),
            icon: <ThemedIcon src="/assets/svg/trash-outline.svg" alt="delete" width={20} />,
            onClick: handleDelete
          },
        ]}
      />

      <ConfirmModal
        {...showConfirmModal}
        onClose={handleCloseModal}
        onConfirm={() => deleteBusinessUnit(selected.businessUnitId, handleCloseModal)}
      />

      {showModalForm.isOpen && (
        <ModalForm
          loading={loading}
          data={selected}
          isOpen={showModalForm.isOpen}
          title={showModalForm.title}
          onClose={handleCloseModal}
          onSubmit={(values) => {
            createBusinessUnit(values, showModalForm.isEdit, selected, handleCloseModal);
          }}
          schema={[
          {
            key: "businessUnitName",
            label: "Nombre",
            type: "text",
            required: showModalForm.isEdit ? false : true,
          },
          {
            key: "businessUnitEmail",
            label: "Correo electrónico",
            type: "email",
            pattern: { message: "Correo inválido", value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i },
            required: showModalForm.isEdit ? false : true,
          },
          {
            key: "businessUnitLogo",
            maxFileSizeMB: 5,
            allowedFormats: ["image/png", "image/jpeg", "image/jpg"],
            label: "Logo",
            type: "file",
            required: showModalForm.isEdit ? false : true,
          },
        ]}
        />
      )}
    </Fragment>
  );
}

