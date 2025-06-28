import BaseService from "@/common/libs/base-services";

export default class ProductMovementService extends BaseService {
  constructor() {
    super("storage/product-movements");
  };

  async fetchGetProductMovements(): Promise<any> {
    const response = await this.get("");
    return response;
  };

  async fetchCreateProductMovement(data: any): Promise<any> {
    const response = await this.post("", data, { isFormData: true });
    return response;
  };

  async fetchUpdateProductMovement(data: any): Promise<any> {
    const response = await this.put("", data);
    return response;
  }
};