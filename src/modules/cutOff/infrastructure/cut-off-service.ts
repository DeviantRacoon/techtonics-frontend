import BaseService from "@/common/libs/base-services";

export default class CutOffService extends BaseService {
  constructor() {
    super("storage/cut-offs");
  };

  async fetchGetCutOffs(): Promise<any> {
    const response = await this.get("");
    return response;
  };

  async fetchCreateCutOff(data: any): Promise<any> {
    const response = await this.post("", data, { isFormData: true });
    return response;
  };

  async fetchUpdateCutOff(data: any): Promise<any> {
    const response = await this.put("", data);
    return response;
  }
};
