// React
import { useState, useCallback } from "react";

// Services
import UserService from "../infrastructure/user-service";
import ProfileService from "@/modules/role/infrastructure/profile-service";
import BusinessUnitService from "@/modules/businessUnit/infrastructure/business-unit-service";

// Resources
import { useToast } from "@/common/components/ToastProvider";
import { IUser } from "../domain/user-model";

const userService = new UserService();
const profileService = new ProfileService();
const businessUnitService = new BusinessUnitService();

export function useUserController() {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [catalogs, setCatalogs] = useState<{ profiles: any[], businessUnits: any[] }>({ profiles: [], businessUnits: [] });

  const getUsers = useCallback(async () => {
    const { data, error } = await userService.fetchGetUsers();

    if (error) {
      toast.show(error.message, { variant: "error" });
      return;
    }

    setRows(data.map((user: any) => ({
      ...user,
      businessUnitsAll: user.businessUnits.map((bu: any) => bu.businessUnitId),
    })));

  }, []);

  const getProfiles = useCallback(async () => {
    const { data = [] } = await profileService.fetchGetProfiles();

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

  const getBusinessUnits = useCallback(async () => {
    const { data = [] } = await businessUnitService.fetchGetBusinessUnits();

    const businessUnits = data
      .map((item: any) => ({
        value: item.businessUnitId,
        label: item.businessUnitName,
      }));

    setCatalogs(prev => ({
      ...prev,
      businessUnits,
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

  const submitAddBusinessUnit = useCallback(
    async (values: any, selected: any, onSuccess: () => void) => {
      setLoading(true);

      const { businessUnitsAll } = values;
      const businessUnits = businessUnitsAll.map((id: any) => ({ businessUnitId: id }));

      const { error } = await userService.fetchAddBusinessUnits({ userId: selected.userId, businessUnits });

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
    getBusinessUnits,
    submitUser,
    submitAddBusinessUnit,
    changeStatus,
  };
}
