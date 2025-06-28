import BaseService from "@/common/libs/base-services";

export default class UserService extends BaseService {
  constructor() {
    super("administration/users");
  };

  async fetchGetUsers(): Promise<any> {
    const response = await this.get("", { "status!=": "ELIMINADO" });
    return response;
  };

  async fetchCreateUser(data: any) {
    const response = await this.post("", data);
    return response;
  };

  async fetchUpdateUser(data: any) {
    const response = await this.put("", data);
    return response;
  };

  async fetchAddBusinessUnits(data: any) {
    const response = await this.put("/business-units", data);
    return response;
  };

};
