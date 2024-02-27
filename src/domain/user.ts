export type UserName = string
export type UserPassword = string
export interface User {
  username: UserName
  password: UserPassword
}

export function registrationUser(username: UserName, password: UserPassword): User {
  return {
    username,
    password
  }
}
