import type { User } from '@/domain/user'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user-store', {
  state: () => ({
    user: {} as User
  }),
  actions: {
    updateUser(user: User) {
      this.user = user
    }
  }
})
