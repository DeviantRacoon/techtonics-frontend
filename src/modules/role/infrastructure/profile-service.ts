import BaseService from "@/common/libs/base-services";

export default class ProfileService extends BaseService {
  constructor() {
    super("administration/roles");
  };

  async fetchGetProfiles() {
    const response = await this.get();
    return response;
  };

  async fetchGetPermissions() {
    const response = await this.get("/permissions");
    return response;
  };

  async fetchAddPermissions(data: any) {
    const response = await this.patch("/permissions", data);
    return response;
  };

  async fetchCreateProfile(data: any) {
    const response = await this.post("", data);
    return response;
  };

  async fetchUpdateProfile(data: any) {
    const response = await this.put("", data);
    return response;
  };

  async fetchDeleteProfile(data: any) {
    const response = await this.delete("", data);
    return response;
  };

};
