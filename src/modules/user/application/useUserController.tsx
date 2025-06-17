// React
import { useState, useCallback } from "react";

// Services
import UserService from "../infrastructure/user-service";
import ProfileService from "@/modules/role/infrastructure/profile-service";

// Resources
import { useToast } from "@/common/components/ToastProvider";
import { IUser } from "../domain/user-model";

const userService = new UserService();
const profileService = new ProfileService();

export function useUserController() {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [catalogs, setCatalogs] = useState<{ profiles: any[] }>({ profiles: [] });

  const getUsers = useCallback(async () => {
    const { data, error } = await userService.fetchGetUsers();

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

  const getProfiles = useCallback(async () => {
    const { data, error } = await profileService.fetchGetProfiles();

    if (error) {
      toast.show(error.message, { variant: "error" });
      return;
    }

    const profiles = data
      .map((item: any) => ({
        value: item.roleId,
        label: item.roleName,
      }));

    setCatalogs(prev => ({
      ...prev,
      profiles,
    }));
  }, []);

  const submitUser = useCallback(
    async (values: any, isEdit: boolean, selected: any, onSuccess: () => void) => {
      setLoading(true);

      const { person, ...params } = values;
      person.personId = selected?.person?.personId;

      const { error } = isEdit
        ? await userService.fetchUpdateUser({ ...params, person, userId: selected.userId })
        : await userService.fetchCreateUser(values);

      if (error) {
        toast.show(error.message, { variant: "error" }, error.errors);
      } else {
        toast.show("Guardado exitoso!", { variant: "success" });
        await getUsers();
        onSuccess();
      }
      setLoading(false);
    },
    [getUsers, toast]
  );

  const changeStatus = useCallback(
    async (selected: any, status: string, onSuccess: () => void) => {
      setLoading(true);
      const { error } = await userService.fetchUpdateUser({ userId: selected.userId, status });

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
    catalogs,
    getUsers,
    getProfiles,
    submitUser,
    changeStatus,
  };
}
