"use client";

import React, { useEffect, Fragment } from "react";

import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

import { SmartTable, Header, ConfirmModal, ThemedIcon, ModalForm } from "@/common/components";

import { useProductMovementController } from "../application/useProductMovementController";
import { useProductMovementUI } from "../application/useProductMovementUI";

import { getAllowedActions } from "@/common/utils";

export function ProductMovementView() {
  const { rows, loading, getProductMovements, createProductMovement, deleteProductMovement } = useProductMovementController();

  const {
    selected,
    showModalForm,
    showConfirmModal,
    handleDelete,
    handleCloseModal,
  } = useProductMovementUI();

  useEffect(() => {
    getProductMovements();
  }, [getProductMovements]);

  return (
    <Fragment>
      <Header
        title="Movimientos"
        description="Administra los movimientos de productos."
        icon={<ShoppingCartCheckoutIcon fontSize="large" color="primary" />}
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
        exportFilename="reporte-movimientos-productos.csv"
        rows={rows}
        columns={[
          { id: "productMovementType", label: "Tipo", align: "left", size: "sm" },
          { id: "quantity", label: "Cantidad", size: "xs" },
          { id: "product.productName", label: "Producto", align: "center" },
          { id: "user.username", label: "Responsable" },
          { id: "cutoffDate", label: "Fecha corte", type: "date" },
        ]}
        actions={[
          {
            label: "Eliminar",
            hidden: !getAllowedActions("product_movement_edit"),
            icon: <ThemedIcon src="/assets/svg/trash-outline.svg" alt="delete" width={20} />,
            onClick: handleDelete
          },
        ]}
      />

      <ConfirmModal
        {...showConfirmModal}
        onClose={handleCloseModal}
        onConfirm={() => deleteProductMovement(selected.productMovementId, handleCloseModal)}
      />

      {showModalForm.isOpen && (
        <ModalForm
          loading={loading}
          data={selected}
          isOpen={showModalForm.isOpen}
          title={showModalForm.title}
          onClose={handleCloseModal}
          onSubmit={(values) => {
            createProductMovement(values, showModalForm.isEdit, selected, handleCloseModal);
          }}
          schema={[
            {
              key: "productId",
              label: "Producto",
              type: "select",
              options: [
                { value: "1", label: "Producto 1" },
                { value: "2", label: "Producto 2" },
              ],
              required: showModalForm.isEdit ? false : true,
            },
            {
              key: "quantity",
              label: "Cantidad",
              type: "number",
              required: showModalForm.isEdit ? false : true,
            },
            {
              key: "type",
              label: "Tipo",
              type: "select",
              options: [
                { value: "ENTRADA", label: "Entrada" },
                { value: "SALIDA", label: "Salida" },
              ],
              required: showModalForm.isEdit ? false : true,
            },
          ]}
        />
      )}
    </Fragment>
  );
}

