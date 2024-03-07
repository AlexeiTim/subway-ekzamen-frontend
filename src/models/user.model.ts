import type { User } from '@/types/user'

class UserModel implements User {
  id: number
  username: string
  email: string

  constructor(user: User) {
    this.id = user.id
    this.username = user.username
    this.email = user.email
  }
}

export default UserModel
