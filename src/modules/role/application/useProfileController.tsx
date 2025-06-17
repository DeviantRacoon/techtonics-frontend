// React
import { useCallback, useState } from "react";

// Resources
import { useToast } from "@/common/components/ToastProvider";

// Services
import ProfileService from "../infrastructure/profile-service";

const profileService = new ProfileService();

export function useProfileController() {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const [catalogs, setCatalogs] = useState<{ requests: any[], profileRequest: any[], requestAllowed: any[] }>({ requests: [], profileRequest: [], requestAllowed: [] });

  const getProfiles = useCallback(async () => {
    const { data, error } = await profileService.fetchGetProfiles();

    if (error) return toast.show(error.message, { variant: "error" });
    setProfiles(data.map((role: any) => ({ ...role, permissions: role.permissions.map((p: any) => p.permissionId) })));
    setTotal(data.length);
  }, []);

  const getRequests = useCallback(async () => {
    const { data, error } = await profileService.fetchGetPermissions();

    if (error) return toast.show(error.message, { variant: "error" });
    const requests = data.map((r: any) => ({ label: r.permissionName, value: r.permissionId }));

    setCatalogs(prev => ({ ...prev, requests }));
  }, []);

  const submitProfile = useCallback(async (values: any, isEdit: boolean, selected: any, onSuccess: () => void) => {
    setLoading(true);

    const { error } = isEdit
      ? await profileService.fetchUpdateProfile({ ...values, roleId: selected.roleId })
      : await profileService.fetchCreateProfile(values);

    if (error) {
      toast.show(error.message, { variant: "error" });
    } else {
      toast.show("Guardado exitoso!", { variant: "success" });
      await getProfiles();
      onSuccess();
    }

    setLoading(false);
  }, [getProfiles, toast]);

  const submitProfileXRequest = useCallback(async (values: any, selected: any, onSuccess: () => void) => {
    setLoading(true);

    const permissions = values.permissions.map((p: any) => ({ permissionId: p }));
    const params = { roleId: selected.roleId, permissions };

    const { error } = await profileService.fetchAddPermissions(params);

    if (error) {
      toast.show(error.message, { variant: "error" });
    } else {
      toast.show("Guardado exitoso!", { variant: "success" });
      await getProfiles();
      onSuccess();
    }

    setLoading(false);
  }, [getProfiles, toast]);

  const deleteProfile = useCallback(async (selected: any, onSuccess: () => void) => {
    setLoading(true);
    const { error } = await profileService.fetchUpdateProfile({ roleId: selected.roleId, status: "ELIMINADO" });

    if (error) {
      toast.show(error.message, { variant: "error" });
    } else {
      toast.show("Eliminado exitoso!", { variant: "success" });
      await getProfiles();
      onSuccess();
    }

    setLoading(false);
  }, [getProfiles]);

  return {
    loading,
    profiles,
    catalogs,
    total,
    getProfiles,
    getRequests,
    submitProfile,
    submitProfileXRequest,
    deleteProfile
  };
}
