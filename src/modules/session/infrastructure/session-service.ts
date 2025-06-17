import BaseService from "@/common/libs/base-services";

export default class SessionService extends BaseService {
  constructor() {
    super("sessions");
  };

  async fetchGetSessions(): Promise<any> {
    const response = await this.get("", { "status!=": "ELIMINADO" });
    return response;
  };

  async fetchDeleteSession(data: any) {
    const response = await this.put("/close-session", data);
    return response;
  };

  async fetchCloseSession() {
    const response = await this.delete();
    return response;
  };

  async fetchBanSession(data: any) {
    const response = await this.put("/ban-session", data);
    return response;
  };

};
