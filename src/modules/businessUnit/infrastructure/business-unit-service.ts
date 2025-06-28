import BaseService from "@/common/libs/base-services";

export default class BusinessUnitService extends BaseService {
  constructor() {
    super("administration/business-units");
  };

  async fetchGetBusinessUnits(): Promise<any> {
    const response = await this.get("");
    return response;
  };

  async fetchCreateBusinessUnit(data: any): Promise<any> {
    const response = await this.post("", data, { isFormData: true });
    return response;
  };

  async fetchUpdateBusinessUnit(data: any): Promise<any> {
    const response = await this.put("", data);
    return response;
  }

};

