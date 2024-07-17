import { AUTH_ENDPOINTS } from '@/constants/auth'
import { API_METHODS } from '@/constants/service'
import type { AuthData, RegistrationReponse } from '@/types/auth'
import makeRequest from '../httpClient'

export class AuthService {
  login(data: AuthData) {
    return makeRequest<{ auth_token: string }>({
      url: AUTH_ENDPOINTS.LOGIN,
      method: API_METHODS.CREATE,
      data
    })
  }

  registration(data: AuthData) {
    return makeRequest<RegistrationReponse>({
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
