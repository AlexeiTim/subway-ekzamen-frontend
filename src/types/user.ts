export type UserName = string
export type UserEmail = string

export interface User {
  readonly id: number
  readonly username: UserName
  readonly email: UserEmail
}
