<template>
  <ElButton @click="handleLogout">
    Выйти
  </ElButton>
</template>

<script lang="ts" setup>
import { ROUTER_NAMES } from '@/constants/router';
import { clearToken } from '@/services/api/config';
import { NotificationService } from '@/services/notify/notification';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const { logout } = useLogout()

const handleLogout = async () => await logout()

function useLogout() {
  const router = useRouter()
  const userStore = useUserStore()
  const notificationService = new NotificationService()

  async function logout() {
    userStore.$reset()
    clearToken()
    router.push({ name: ROUTER_NAMES.LOGIN })
    notificationService.success('Ждём вашего возвращения')
  }

  return {
    logout
  }
}
</script>