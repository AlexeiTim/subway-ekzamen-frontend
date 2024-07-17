import { ERRORS } from '@/constants/errors'
import { ROUTER_NAMES } from '@/constants/router'
import { generateWelcomeMessage } from '@/helpers/generateWelcomeMessage'
import { setToken } from '@/services/api/config'
import { AuthService } from '@/services/api/rest/auth'
import { UserService } from '@/services/api/rest/user'
import { NotificationService } from '@/services/notify/notification'
import { useUserStore } from '@/stores/user'
import type { AuthData } from '@/types/auth'
import { useRouter } from 'vue-router'

export function useLogin() {
  const authService = new AuthService()
  const userService = new UserService()
  const notificationService = new NotificationService()
  const userStore = useUserStore()
  const router = useRouter()

  async function login(loginData: AuthData) {
    const errors: string[] = []
    try {
      const { data } = await authService.login(loginData)
      if (!data) return notificationService.error(ERRORS.NOT_AUTHORIZATION)
      localStorage.setItem('username', loginData.username)
      localStorage.setItem('password', loginData.password)
      setToken(data.auth_token)
    } catch (e) {
      errors.push(ERRORS.NOT_HAVE_USER)
      notificationService.error(ERRORS.NOT_HAVE_USER)
    }

    if (errors.length)
      return {
        errors
      }

    try {
      const { data: user } = await userService.getCurrentUser()
      if (!user) return notificationService.error(ERRORS.NOT_HAVE_USER)
      userStore.updateUser(user)
      router.push({ name: ROUTER_NAMES.HOME })
      const welcomeMessage = generateWelcomeMessage(user.username)
      notificationService.success(welcomeMessage)
    } catch (e) {
      errors.push(ERRORS.CANT_GET_USER_DATA)
      notificationService.error(ERRORS.CANT_GET_USER_DATA)
    }

    return {
      errors
    }
  }

  return {
    login
  }
}
