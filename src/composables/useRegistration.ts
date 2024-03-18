import { REGISTRATION_MESSAGES } from "@/constants/auth"
import { ERRORS } from "@/constants/errors"
import { ROUTER_NAMES } from "@/constants/router"
import { AuthService } from "@/services/api/rest/auth"
import { NotificationService } from "@/services/notify/notification"
import type { AuthData } from "@/types/auth"
import { useRouter } from "vue-router"

export function useRegistration() {
  const authService = new AuthService()
  const notificationService = new NotificationService()
  const router = useRouter()


  async function registration(registrationData: AuthData) {
    try {
      const { data: user } = await authService.registration(registrationData)

      if (!user) return notificationService.error(ERRORS.CANT_CREATE_USER)
      console.log('user', user)
      router.push({ name: ROUTER_NAMES.LOGIN })
      console.log('push')
      notificationService.success(REGISTRATION_MESSAGES.SUCCESS)
    } catch (e) {
      notificationService.error(ERRORS.CANT_CREATE_USER)
    }
  }

  return {
    registration
  }
}
