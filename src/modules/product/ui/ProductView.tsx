"use client";

import React, { useEffect, Fragment } from "react";

import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AddIcon from "@mui/icons-material/Add";

import { SmartTable, Header, ConfirmModal, ThemedIcon, SmartButton, ModalForm } from "@/common/components";

import { useProductController } from "../application/useProductController";
import { useProductUI } from "../application/useProductUI";

import { getAllowedActions } from "@/common/utils";

export function ProductView() {
  const { rows, catalogs, loading, getProducts, getBusinessUnitsByUser, createProduct, deleteProduct } = useProductController();

  const {
    selected,
    showModalForm,
    showConfirmModal,
    handleDelete,
    handleCloseModal,
    handleCreate,
    handleEdit
  } = useProductUI();

  useEffect(() => {
    getProducts();
    getBusinessUnitsByUser();
  }, [getProducts]);

  return (
    <Fragment>
      <Header
        title="Productos"
        description="Almacén de productos."
        icon={<ProductionQuantityLimitsIcon fontSize="large" color="primary" />}
        actions={
          <SmartButton
            label="Agregar producto"
            variant="contained"
            leftIcon={<AddIcon />}
            hidden={!getAllowedActions('product_create')}
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
        exportFilename="reporte-productos.csv"
        rows={rows}
        columns={[
          { id: "productImage", label: "", type: "image" },
          { id: "productName", label: "Nombre" },
          { id: "type", label: "Tipo" },
          { id: "status", label: "Estatus", type: "status" },
          { id: "createdBy.username", label: "Creado" },
          { id: "createdAt", label: "Fecha de creación", type: "date" },
          { id: "updatedAt", label: "Ult. actualización", type: "datetime" },
        ]}
        actions={[
          {
            label: "Editar",
            hidden: !getAllowedActions("product_edit"),
            icon: <ThemedIcon src="/assets/svg/create-outline.svg" alt="edit" width={20} />,
            onClick: handleEdit
          },
          {
            label: "Eliminar",
            hidden: !getAllowedActions("product_edit"),
            icon: <ThemedIcon src="/assets/svg/trash-outline.svg" alt="delete" width={20} />,
            onClick: handleDelete
          },
        ]}
      />

      <ConfirmModal
        {...showConfirmModal}
        onClose={handleCloseModal}
        onConfirm={() => deleteProduct(selected.productId, handleCloseModal)}
      />

      {showModalForm.isOpen && (
        <ModalForm
          loading={loading}
          data={
            {
              ...selected,
              businessUnitId: catalogs.businessUnits.length === 1
                ? catalogs.businessUnits[0].value
                : undefined
            }}
          isOpen={showModalForm.isOpen}
          title={showModalForm.title}
          description={showModalForm.description}
          onClose={handleCloseModal}
          onSubmit={(values) => {
            createProduct(values, showModalForm.isEdit, selected, handleCloseModal);
          }}
          schema={[
            {
              key: "productName",
              label: "Nombre",
              type: "text",
              required: showModalForm.isEdit ? false : true,
            },
            {
              key: "type",
              label: "Tipo de producto",
              type: "select",
              required: showModalForm.isEdit ? false : true,
              options: [
                { value: "SERVICIO", label: "Servicio" },
                { value: "ALMACEN", label: "Producto" },
              ],
            },
            {
              key: "isStocked",
              label: "Es inventario",
              type: "checkbox",
              breakpoint: { xs: 4 }
            },
            {
              key: "hasPrice",
              label: "Tiene precio",
              type: "checkbox",
              breakpoint: { xs: 4 }
            },
            {
              key: "hasCode",
              label: "Tiene código",
              type: "checkbox",
              breakpoint: { xs: 4 }
            },
            {
              key: "productPrice",
              label: "Precio",
              type: "number",
              hidden: (formValues) => {
                return !formValues.hasPrice;
              },
            },
            {
              key: "stock",
              label: "Stock",
              type: "number",
              hidden: (formValues) => {
                return !formValues.isStocked;
              },
            },
            {
              key: "productCode",
              label: "Código",
              hidden: (formValues) => {
                return !formValues.hasCode;
              },
            },
            {
              key: "productImage",
              maxFileSizeMB: 5,
              allowedFormats: ["image/png", "image/jpeg", "image/jpg"],
              label: "Imagen",
              type: "file",
            },
            {
              key: "productDescription",
              label: "Descripción",
              type: "textarea",
              maxLength: 64,
            },
            {
              key: "businessUnitId",
              label: "Unidades de negocio",
              type: "select",
              options: catalogs.businessUnits,
              disabled: catalogs.businessUnits.length === 1
            },
          ]}
        />
      )}
    </Fragment>
  );
}

