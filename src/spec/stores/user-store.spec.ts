import { UserModel } from "@/models"
import { useUserStore } from "@/stores"
import { createPinia, setActivePinia } from "pinia"
import { beforeEach, describe, expect, it } from "vitest"

const testUser = {
  id: 1,
  username: 'test',
  email: 'test@mail.ru'
}
describe('user-store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initial state', () => {
    const userStore = useUserStore()
    expect(Object.keys(userStore.user).length).toBe(0)
  })

  it('update user', () => {
    const userStore = useUserStore()

    userStore.updateUser(testUser)

    expect(userStore.user).toBeInstanceOf(UserModel)
    expect(userStore.user.id).toBe(testUser.id)
    expect(userStore.user.username).toBe(testUser.username)
    expect(userStore.user.email).toBe(testUser.email)
  })
})