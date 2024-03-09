import UserModel from '@/models/user.model';
import type { User } from '@/types/user';
import { defineStore } from 'pinia';


export const useUserStore = defineStore('user-store', {
  state: () => ({
    user: {} as User
  }),
  actions: {
    updateUser(user: User) {
      this.user = new UserModel(user)
    }
  }
})
