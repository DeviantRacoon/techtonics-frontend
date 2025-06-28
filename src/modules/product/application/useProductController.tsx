// React
import { useState, useCallback } from "react";

// Services
import ProductService from "../infrastructure/product-service";
import BusinessUnitService from "@/modules/businessUnit/infrastructure/business-unit-service";

// Resources
import { useToast } from "@/common/components/ToastProvider";
import { STATUS_PRODUCT, IProduct } from "../domain/product-model";

import { getCurrentUser } from "@/common/utils";

const productService = new ProductService();
const businessUnitService = new BusinessUnitService();

export function useProductController() {
  const currentUser = getCurrentUser();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [catalogs, setCatalogs] = useState<{ businessUnits: any[] }>({ businessUnits: [] });

  const getProducts = useCallback(async () => {
    const { data, error } = await productService.fetchGetProducts();

    if (error) {
      toast.show(error.message, { variant: "error" });
      return;
    }

    setRows(data.map((product: IProduct) => ({
      ...product,
      isStocked: product.stock > 0,
      hasPrice: product.productPrice > 0,
      hasCode: !!product.productCode
    })));

  }, []);

  const getBusinessUnitsByUser = useCallback(async () => {
    const { data, error } = await businessUnitService.fetchGetBusinessUnits();

    if (error) {
      toast.show(error.message, { variant: "error" });
      return;
    }

    const businessUnits = data
      .filter((bu: any) => bu.users.find((u: any) => u.userId === currentUser?.userId))
      .map((bu: any) => ({
        value: bu.businessUnitId,
        label: bu.businessUnitName,
      }))

    setCatalogs(prev => ({ ...prev, businessUnits }));
  }, []);

  const createProduct = useCallback(async (data: any, isEdit: boolean, selected: any, onSuccess: () => void) => {
    setLoading(true);

    const { error } = isEdit
      ? await productService.fetchUpdateProduct({ ...data })
      : await productService.fetchCreateProduct({ ...data, createdBy: currentUser?.userId });

    if (error) {
      toast.show(error.message, { variant: "error" });
    } else {
      toast.show("Actualización exitosa!", { variant: "success" });
      await getProducts();
      onSuccess();
    }

    setLoading(false);
  }, [getProducts]);

  const deleteProduct = useCallback(async (productId: string, onSuccess: () => void) => {
    setLoading(true);

    const { error } = await productService.fetchUpdateProduct({ productId, status: STATUS_PRODUCT.DELETED });

    if (error) {
      toast.show(error.message, { variant: "error" });
    } else {
      toast.show("Eliminación exitosa!", { variant: "success" });
      await getProducts();
      onSuccess();
    }

    setLoading(false);
  }, [getProducts]);

  return {
    loading,
    rows,
    catalogs,
    getProducts,
    getBusinessUnitsByUser,
    createProduct,
    deleteProduct,
  };
}

