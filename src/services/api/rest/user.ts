import { API_METHODS } from "@/constants/service";
import { USER_ENDPOINTS } from "@/constants/user";
import makeRequest from "../httpClient";
import { BaseApiSerivce } from "./base";

export class UserService extends BaseApiSerivce {
  constructor(endpoint: string = '', methods = []) {
    super(endpoint, methods)
  }

  getCurrentUser(): Promise<any> {
    return makeRequest({
      url: USER_ENDPOINTS.CURRENT_USER,
      method: API_METHODS.GET
    })
  }
}