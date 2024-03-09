import type { BaseResponse } from "./api"
import type { User } from "./user"

export interface AuthData {
  readonly username: string
  readonly password: string
}

type AuthToken = {
  auth_token: string
}

export interface LoginResponse extends BaseResponse<AuthToken> {}
export interface RegistrationReponse extends BaseResponse<User> {}