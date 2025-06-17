"use client";

import React, { useEffect, Fragment } from "react";

import AddIcon from "@mui/icons-material/Add";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

import { SmartTable, Header, SmartButton, ModalForm, ConfirmModal, ThemedIcon } from "@/common/components";
import { getAllowedActions } from "@/common/utils";

import { useProfileController } from "../application/useProfileController";
import { useProfileUI } from "../application/useProfileUI";

export function ProfileView() {
  const {
    loading,
    profiles,
    catalogs,
    getProfiles,
    getRequests,
    submitProfile,
    submitProfileXRequest,
    deleteProfile,
  } = useProfileController();

  const {
    selected,
    showFormModal,
    showConfirmModal,
    showRequestModal,
    handleCreate,
    handleEdit,
    handleDelete,
    handleCloseModal,
    handleRequestEdit,
  } = useProfileUI();

  useEffect(() => {
    getProfiles();
    getRequests();
  }, [getProfiles]);

  return (
    <Fragment>
      <Header title="Roles"
        description="Administra los roles de los usuarios."
        icon={<AssignmentIndIcon fontSize="large" color="primary" />}
        actions={
          <SmartButton
            label="Agregar rol"
            variant="contained"
            leftIcon={<AddIcon />}
            hidden={!getAllowedActions('role_create')}
            onClick={handleCreate}
          />
        }
      />

      <SmartTable
        exportFilename="reporte-roles.csv"
        rows={profiles}
        loading={loading}
        filters={[
          {
            label: "Estatus",
            id: "status",
            options: Array.from(new Set(profiles.map(row => row.status)))
              .map(status => ({ label: status, value: status })),
          },
        ]}
        columns={[
          { id: "roleName", label: "Nombre", collapsible: true },
          { id: "status", label: "Estatus", type: "status", align: "center" },
        ]}
        actions={[
          {
            label: "Editar",
            hidden: (row) => {
              if (row?.status === "ELIMINADO") return true
              return !getAllowedActions("role_edit")
            },
            icon: <ThemedIcon src="/assets/svg/create-outline.svg" alt="edit" width={20} />,
            onClick: handleEdit,
          },
          {
            label: "Permisos",
            hidden: (row) => {
              if (row?.status === "ELIMINADO") return true
              return !getAllowedActions('role_permission_edit')
            },
            icon: <ThemedIcon src="/assets/svg/settings-outline.svg" alt="permissions" width={20} />,
            onClick: (row) => handleRequestEdit(row, catalogs),
          },
          {
            label: "Eliminar",
            hidden: (row) => {
              if (row?.status === "ELIMINADO") return true
              return !getAllowedActions('role_edit')
            },
            icon: <ThemedIcon src="/assets/svg/trash-outline.svg" alt="delete" width={20} />,
            onClick: handleDelete,
          },
        ]}
      />

      <ConfirmModal
        {...showConfirmModal}
        onClose={handleCloseModal}
        onConfirm={() => deleteProfile(selected, handleCloseModal)}
      />

      <ModalForm
        loading={loading}
        data={selected}
        isOpen={showFormModal.isOpen}
        onClose={handleCloseModal}
        onSubmit={(values) =>
          submitProfile(values, showFormModal.isEdit, selected, handleCloseModal)
        }
        title={showFormModal.title}
        description={showFormModal.description}
        schema={[
          {
            key: "roleName",
            label: "Nombre rol",
            required: true,
          }
        ]}
      />

      <ModalForm
        loading={loading}
        data={selected}
        isOpen={showRequestModal.isOpen}
        onClose={handleCloseModal}
        onSubmit={(values) => submitProfileXRequest(values, selected, handleCloseModal)}
        title={showRequestModal.title}
        description={showRequestModal.description}
        schema={[
          {
            key: 'permissions',
            label: 'Permisos',
            type: 'select',
            placeholder: 'Selecciona los permisos',
            required: true,
            multiple: true,
            options: catalogs.requests,
          }
        ]}
      />
    </Fragment>
  );
}
