"use client";

import React, { useEffect, Fragment } from "react";
import AddIcon from "@mui/icons-material/Add";
import SwitchAccountRoundedIcon from "@mui/icons-material/SwitchAccountRounded";

import { SmartTable, Header, SmartButton, ModalForm, ConfirmModal } from "@/common/components";

import { useUserController } from "../application/useUserController";
import { useUserUI } from "../application/useUserUI";

import { getAllowedActions } from "@/common/utils";

export function UserView() {
  const {
    loading,
    rows,
    catalogs,
    getUsers,
    getProfiles,
    submitUser,
    changeStatus,
  } = useUserController();

  const {
    selected,
    showConfirmModal,
    showFormModal,
    handleCreate,
    handleEdit,
    handleDelete,
    handleActive,
    handleCloseModal,
  } = useUserUI();

  useEffect(() => {
    getUsers();
    getProfiles();
  }, [getUsers]);

  return (
    <Fragment>
      <Header
        title="Usuarios"
        description="Administra los usuarios del sistema."
        icon={<SwitchAccountRoundedIcon fontSize="large" color="primary" />}
        actions={
          <SmartButton
            label="Agregar usuario"
            variant="contained"
            leftIcon={<AddIcon />}
            hidden={!getAllowedActions("user_create")}
            onClick={handleCreate}
          />
        }
      />

      <SmartTable
        exportFilename="reporte-usuarios.csv"
        rows={rows}
        filters={[
          {
            id: "status",
            label: "Estado",
            options: Array.from(new Set(rows.map(row => row.status)))
              .map(status => ({ label: status, value: status }))
          },
          {
            id: "role.roleId",
            label: "Roles",
            options: catalogs.profiles,
          },
        ]}
        columns={[
          { id: "username", label: "Nombre", tooltip: true },
          { id: "email", label: "Email" },
          { id: "roleName", label: "Role" },
          { id: "status", label: "Estatus", type: "status" },
          { id: "createdAt", label: "Fecha creación", type: "date" },
        ]}
        actions={[
          {
            label: "Editar",
            hidden: (row) => {
              if (row?.status === "ELIMINADO") return true
              return !getAllowedActions("user_edit")
            },
            icon: <img src="/assets/svg/create-outline.svg" alt="edit" width="20" />,
            onClick: handleEdit
          },
          {
            label: "Activar",
            hidden: (row) => {
              if (row?.status === "ACTIVO") return true
              return !getAllowedActions("user_edit")
            },
            icon: <img src="/assets/svg/checkmark-circle-outline.svg" alt="active" width="20" />,
            onClick: handleActive
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
          const status = showConfirmModal.title === "Activar usuario" ? "ACTIVO" : "ELIMINADO";
          changeStatus(selected, status, handleCloseModal);
        }}
      />

      <ModalForm
        loading={loading}
        data={selected}
        isOpen={showFormModal.isOpen}
        onClose={handleCloseModal}
        onSubmit={(values) =>
          submitUser(values, showFormModal.isEdit, selected, handleCloseModal)
        }
        title={showFormModal.title}
        description={showFormModal.description}
        schema={[
          {
            key: "username",
            label: "Usuario",
            required: !showFormModal.isEdit,
          },
          {
            key: "person.curp",
            label: "CURP",
            required: true,
            maxLength: 18,
            pattern: {
              value: /^[A-Z][AEIXOU][A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HM](AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]\d$/,
              message: "La CURP no es válida."
            }
          },
          {
            key: "person.names",
            label: "Nombre(s)",
            required: true
          },
          {
            key: "person.lastName",
            label: "Apellido Paterno",
            required: true,
            breakpoint: { xs: 6 },
          },
          {
            key: "person.secondLastName",
            label: "Apellido Materno",
            required: true,
            breakpoint: { xs: 6 },
          },
          {
            key: "email",
            label: "Correo",
            type: "email",
            required: true,
            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "El correo no es válido." },
            breakpoint: { xs: 6 },
          },
          {
            key: "person.cellphone",
            label: "Celular",
            type: "tel",
            required: true,
            maxLength: 10,
            pattern: { value: /^[0-9]{10}$/, message: "El número de celular no es válido." },
            breakpoint: { xs: 6 },
          },
          {
            key: "person.gender",
            label: "Genero",
            type: "select",
            required: true,
            options: [
              { label: "Masculino", value: "M" },
              { label: "Femenino", value: "F" },
            ],
            breakpoint: { xs: 6 },
          },
          {
            key: "person.birthdate",
            label: "Fecha de nacimiento",
            type: "date",
            breakpoint: { xs: 6 },
          },
          {
            key: "role.roleId",
            label: "Rol",
            type: "select",
            options: catalogs.profiles,
          },
          {
            key: "password",
            label: "Contraseña",
            type: "password",
            minLength: showFormModal.isEdit ? 0 : 8,
            pattern: showFormModal.isEdit ? undefined : { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: "La contraseña debe tener al menos 8 caracteres, una letra y un número." },
            required: !showFormModal.isEdit,
          },
        ]}
      />
    </Fragment>
  );
}
