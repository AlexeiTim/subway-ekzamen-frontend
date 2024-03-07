import { AUTH_ENDPOINTS } from '@/constants/auth'
import { API_METHODS } from '@/constants/service'
import type { AuthData } from '@/types/auth'
import makeRequest from '../httpClient'
import { BaseApiSerivce } from './base'

export class AuthService extends BaseApiSerivce {
  constructor(endpoint: string = '', methods = []) {
    super(endpoint, methods)
  }

  login(data: AuthData) {
    return makeRequest({
      url: AUTH_ENDPOINTS.LOGIN,
      method: API_METHODS.CREATE,
      data
    })
  }

  registration(data: AuthData) {
    return makeRequest({
      url: AUTH_ENDPOINTS.REGISTRATION,
      method: API_METHODS.CREATE,
      data
    })
  }

  logout() {
    return makeRequest({
      url: AUTH_ENDPOINTS.LOGOUT,
      method: API_METHODS.CREATE
    })
  }
}
