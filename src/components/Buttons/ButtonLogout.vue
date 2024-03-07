<template>
  <ElButton @click="handleLogout">
    Выйти
  </ElButton>
</template>

<script lang="ts" setup>
import { ROUTER_NAMES } from '@/constants/router';
import { clearToken } from '@/services/api/config';
import { AuthService } from '@/services/api/rest/auth';
import { TokenStorage } from '@/services/storage/token';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const { logout } = useLogout()

const handleLogout = async () => await logout()

function useLogout() {
  const authService = new AuthService()
  const tokenStorage = new TokenStorage()
  const router = useRouter()
  const userStore = useUserStore()

  async function logout() {
    console.log('init logout')
    const token = tokenStorage.getToken()
    console.log(token)

    if (!token) return router.push({ name: ROUTER_NAMES.LOGIN })

    try {
      await authService.logout()
      userStore.$reset()
      clearToken()
      router.push({ name: ROUTER_NAMES.LOGIN })
    } catch (error) {
      console.error(error)
    }
  }

  return {
    logout
  }
}
</script>