// React
import { useState, useCallback } from "react";

// Services
import ProductMovementService from "../infrastructure/product-movement-service";

// Resources
import { useToast } from "@/common/components/ToastProvider";
import { STATUS_PRODUCT_MOVEMENT } from "../domain/product-movement-model";

const productMovementService = new ProductMovementService();

export function useProductMovementController() {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<any[]>([]);

  const getProductMovements = useCallback(async () => {
    const { data, error } = await productMovementService.fetchGetProductMovements();

    if (error) {
      toast.show(error.message, { variant: "error" });
      return;
    }

    setRows(data.map((movement: any) => ({
      ...movement,
      roleId: movement.role?.roleId,
      roleName: movement.role?.roleName,
    })));

  }, []);

  const createProductMovement = useCallback(async (data: any, isEdit: boolean, selected: any, onSuccess: () => void) => {
    setLoading(true);

    const { error } = isEdit
      ? await productMovementService.fetchUpdateProductMovement(data)
      : await productMovementService.fetchCreateProductMovement(data);

    if (error) {
      toast.show(error.message, { variant: "error" });
    } else {
      toast.show("Actualización exitosa!", { variant: "success" });
      await getProductMovements();
      onSuccess();
    }

    setLoading(false);
  }, [getProductMovements]);

  const deleteProductMovement = useCallback(async (productMovementId: string, onSuccess: () => void) => {
    setLoading(true);

    const { error } = await productMovementService.fetchUpdateProductMovement({ productMovementId, status: STATUS_PRODUCT_MOVEMENT.DELETED });

    if (error) {
      toast.show(error.message, { variant: "error" });
    } else {
      toast.show("Eliminación exitosa!", { variant: "success" });
      await getProductMovements();
      onSuccess();
    }

    setLoading(false);
  }, [getProductMovements]);

  return {
    loading,
    rows,
    getProductMovements,
    createProductMovement,
    deleteProductMovement,
  };
}

