import { useAuth } from '@/services/adapters/authAdapter'
import { useUserService } from '@/services/adapters/userAdapter'
import { clearToken, setToken } from '@/services/api/config'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

interface AuthData {
  username: string
  password: string
}

export const useAuthentication = () => {
  const auth = useAuth()
  const userService = useUserService()
  const userStore = useUserStore()
  const router = useRouter()

  async function registration(registrationData: AuthData) {
    const { data: user } = await auth.registration(registrationData)
    console.log(user)
    
    if (!user) return
    router.push({ name: 'login' })
  }

  async function logout() {
    const token = localStorage.getItem('token')
    userStore.$reset()
    if (!token) return router.push({ name: 'login' })
    clearToken()
    router.push({ name: 'login' })
  }

  async function authentication(authData: AuthData) {
    const { username, password } = authData

    try {
      const { data: authData } = await auth.login({ username, password })
      if (!authData) return alert('bad request')
      setToken(authData.auth_token)
    } catch (e) {
      return console.log('не верные данные пользователя')
    }

    try {
      const { data: user } = await userService.user()
      if (!user) return alert('dont have user')
      userStore.updateUser(user)
      router.push({ name: 'home' })
    } catch (e) {
      return console.log('проблемы с авторизацией')
    }
  }

  return {
    authentication, logout, registration
  }
}
