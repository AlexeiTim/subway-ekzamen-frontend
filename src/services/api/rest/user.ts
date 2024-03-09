import { API_METHODS } from "@/constants/service";
import { USER_ENDPOINTS } from "@/constants/user";
import makeRequest from "../httpClient";

export class UserService {
  getCurrentUser(): Promise<any> {
    return makeRequest({
      url: USER_ENDPOINTS.CURRENT_USER,
      method: API_METHODS.GET
    })
  }
}