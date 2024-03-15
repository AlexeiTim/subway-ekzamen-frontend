export type UserId = number
export type UserName = string
export type UserEmail = string

export interface User {
  readonly id: UserId
  readonly username: UserName
  readonly email: UserEmail
}
