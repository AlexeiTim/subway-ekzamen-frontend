import type { UserName, UserPassword } from "@/domain/user"
import { useAuth } from "@/services/adapters/authAdapter"

interface RegistrationData {
  username: UserName,
  password: UserPassword
}

export const useRegistration = () => {
  const authService = useAuth()

  async function registration(registrationData: RegistrationData) {
    const { data: user } = await authService.registration(registrationData)
    console.log(user)
  }
  return {
    registration
  }
}