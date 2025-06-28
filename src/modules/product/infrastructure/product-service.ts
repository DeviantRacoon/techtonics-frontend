import BaseService from "@/common/libs/base-services";

export default class ProductService extends BaseService {
  constructor() {
    super("storage/products");
  }

  async fetchGetProducts(): Promise<any> {
    const response = await this.get("");
    return response;
  }

  async fetchCreateProduct(data: any): Promise<any> {
    console.log(data);

    const response = await this.post("", data, { isFormData: true });
    return response;
  }

  async fetchUpdateProduct(data: any): Promise<any> {
    const response = await this.put("", data);
    return response;
  }
}

