import { REGISTRATION_MESSAGES } from "@/constants/auth"
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
    const { data: user } = await authService.registration(registrationData)

    if (!user) return
    
    router.push({ name: ROUTER_NAMES.LOGIN })
    notificationService.success(REGISTRATION_MESSAGES.SUCCESS)
  }

  return {
    registration
  }
}
