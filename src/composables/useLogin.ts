import { ROUTER_NAMES } from "@/constants/router"
import { generateWelcomeMessage } from "@/helpers/generateWelcomeMessage"
import { setToken } from "@/services/api/config"
import { AuthService } from "@/services/api/rest/auth"
import { UserService } from "@/services/api/rest/user"
import { NotificationService } from "@/services/notify/notification"
import { useUserStore } from "@/stores/user"
import type { AuthData } from "@/types/auth"
import { useRouter } from "vue-router"

export function useLogin() {
  const authService = new AuthService()
  const userService = new UserService()
  const notificationService = new NotificationService()
  const userStore = useUserStore()
  const router = useRouter()

  async function login(loginData: AuthData) {
    try {
      const { data } = await authService.login(loginData)
      if (!data) return alert('bad request')

      setToken(data.auth_token)
    } catch (e) {
      notificationService.error(JSON.stringify(e))
    }

    try {
      const { data: user } = await userService.getCurrentUser()
      if (!user) return alert('dont have user')

      userStore.updateUser(user)
      router.push({ name: ROUTER_NAMES.HOME })
      
      const welcomeMessage = generateWelcomeMessage(user.username)
      notificationService.success(welcomeMessage)
    } catch (e) {
      notificationService.error(JSON.stringify(e))
    }
  }

  return {
    login,
  }
}