// React
import { useState, useCallback } from "react";

// Services
import BusinessUnitService from "../infrastructure/business-unit-service";

// Resources
import { useToast } from "@/common/components/ToastProvider";
import { STATUS_BUSINESS_UNIT } from "../domain/business-unit-model";

const businessUnitService = new BusinessUnitService();

export function useBusinessUnitController() {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<any[]>([]);

  const getBusinessUnits = useCallback(async () => {
    const { data, error } = await businessUnitService.fetchGetBusinessUnits();

    if (error) {
      toast.show(error.message, { variant: "error" });
      return;
    }

    setRows(data.map((unit: any) => ({
      ...unit,
      roleId: unit.role?.roleId,
      roleName: unit.role?.roleName,
    })));

  }, []);

  const createBusinessUnit = useCallback(async (data: any, isEdit: boolean, selected: any, onSuccess: () => void) => {
    setLoading(true);

    const { error } = isEdit
      ? await businessUnitService.fetchUpdateBusinessUnit(data)
      : await businessUnitService.fetchCreateBusinessUnit(data);

    if (error) {
      toast.show(error.message, { variant: "error" });
    } else {
      toast.show("Actualización exitosa!", { variant: "success" });
      await getBusinessUnits();
      onSuccess();
    }

    setLoading(false);
  }, [getBusinessUnits]);

  const deleteBusinessUnit = useCallback(async (businessUnitId: string, onSuccess: () => void) => {
    setLoading(true);

    const { error } = await businessUnitService.fetchUpdateBusinessUnit({ businessUnitId, status: STATUS_BUSINESS_UNIT.DELETED });

    if (error) {
      toast.show(error.message, { variant: "error" });
    } else {
      toast.show("Eliminación exitosa!", { variant: "success" });
      await getBusinessUnits();
      onSuccess();
    }

    setLoading(false);
  }, [getBusinessUnits]);

  return {
    loading,
    rows,
    getBusinessUnits,
    createBusinessUnit,
    deleteBusinessUnit,
  };
}

