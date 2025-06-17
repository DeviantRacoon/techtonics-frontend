import api from "@/common/libs/api-services";
export default abstract class BaseService {
  protected baseUrl: string;
  protected api = api.safe;

  constructor(baseUrl: string) {
    this.baseUrl = "/" + baseUrl;
  }

  protected async get(path?: string, params?: any) {
    return await this.api.get(path ? this.baseUrl + path : this.baseUrl, params);
  }

  protected post(path?: string, data?: any, options?: any) {
    return this.api.post(path ? this.baseUrl + path : this.baseUrl, data, options);
  }

  protected put(path?: string, data?: any, options?: any) {
    return this.api.put(path ? this.baseUrl + path : this.baseUrl, data, options);
  }

  protected patch(path?: string, data?: any, options?: any) {
    return this.api.patch(path ? this.baseUrl + path : this.baseUrl, data, options);
  }

  protected delete(path?: string, data?: any) {
    return this.api.delete(path ? this.baseUrl + path : this.baseUrl, data);
  }
}

