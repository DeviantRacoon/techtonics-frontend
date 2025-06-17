// React
import { useState, useCallback } from "react";

// Services
import SessionService from "../infrastructure/session-service";

// Resources
import { useToast } from "@/common/components/ToastProvider";
import { STATUS_SESSION } from "../domain/session-model";

const userService = new SessionService();

export function useSessionController() {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<any[]>([]);

  const getUsers = useCallback(async () => {
    const { data, error } = await userService.fetchGetSessions();

    if (error) {
      toast.show(error.message, { variant: "error" });
      return;
    }

    setRows(data.map((user: any) => ({
      ...user,
      roleId: user.role?.roleId,
      roleName: user.role?.roleName,
    })));

  }, []);

  const changeStatus = useCallback(
    async (selected: any, status: string, onSuccess: () => void) => {
      setLoading(true);

      const { error } = status === STATUS_SESSION.BAN
        ? await userService.fetchBanSession(selected)
        : await userService.fetchDeleteSession(selected);

      if (error) {
        toast.show(error.message, { variant: "error" });
      } else {
        toast.show("Actualización exitosa!", { variant: "success" });
        await getUsers();
        onSuccess();
      }

      setLoading(false);
    },
    [getUsers]
  );

  return {
    loading,
    rows,
    getUsers,
    changeStatus,
  };
}
