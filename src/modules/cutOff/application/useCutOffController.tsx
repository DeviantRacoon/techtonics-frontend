// React
import { useState, useCallback } from "react";

// Services
import CutOffService from "../infrastructure/cut-off-service";

// Resources
import { useToast } from "@/common/components/ToastProvider";
import { STATUS_CUT_OFF } from "../domain/cut-off-model";

const cutOffService = new CutOffService();

export function useCutOffController() {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<any[]>([]);

  const getCutOffs = useCallback(async () => {
    const { data, error } = await cutOffService.fetchGetCutOffs();

    if (error) {
      toast.show(error.message, { variant: "error" });
      return;
    }

    setRows(data.map((cutOff: any) => ({
      ...cutOff,
      roleId: cutOff.role?.roleId,
      roleName: cutOff.role?.roleName,
    })));

  }, []);

  const createCutOff = useCallback(async (data: any, isEdit: boolean, selected: any, onSuccess: () => void) => {
    setLoading(true);

    const { error } = isEdit
      ? await cutOffService.fetchUpdateCutOff(data)
      : await cutOffService.fetchCreateCutOff(data);

    if (error) {
      toast.show(error.message, { variant: "error" });
    } else {
      toast.show("Actualización exitosa!", { variant: "success" });
      await getCutOffs();
      onSuccess();
    }

    setLoading(false);
  }, [getCutOffs]);

  const deleteCutOff = useCallback(async (cutOffId: string, onSuccess: () => void) => {
    setLoading(true);

    const { error } = await cutOffService.fetchUpdateCutOff({ cutOffId, status: STATUS_CUT_OFF.DELETED });

    if (error) {
      toast.show(error.message, { variant: "error" });
    } else {
      toast.show("Eliminación exitosa!", { variant: "success" });
      await getCutOffs();
      onSuccess();
    }

    setLoading(false);
  }, [getCutOffs]);

  return {
    loading,
    rows,
    getCutOffs,
    createCutOff,
    deleteCutOff,
  };
}

