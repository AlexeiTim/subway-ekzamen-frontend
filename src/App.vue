<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'
import { IMAGES } from '@/constants/images'
import { UserService } from '@/services/api/rest/user'
import { useUserStore } from './stores'
import { ROUTER_NAMES } from './constants/router'
import { useRouter } from 'vue-router'
import { NotificationService } from './services/notify/notification'
import { ERRORS } from './constants/errors'
import { generateWelcomeMessage } from './helpers/generateWelcomeMessage'
import { setToken } from './services/api/config'

const token = localStorage.getItem('token')
const userStore = useUserStore()
const router = useRouter()

async function initAutoLogin(token: string) {
  try {
    setToken(token)
    const { data: user } = await new UserService().getCurrentUser()
    if (!user) {
      return
    }

    userStore.updateUser(user)
    router.push({ name: ROUTER_NAMES.HOME })
    const welcomeMessage = generateWelcomeMessage(user.username)
    new NotificationService().success(welcomeMessage)
  } catch (e) {
    new NotificationService().error(ERRORS.CANT_GET_USER_DATA)
  }
}

if (token) {
  initAutoLogin(token)
}
</script>

<template>
  <div
    class="flex flex-col h-full"
    :style="{
      backgroundImage: `url(${IMAGES.MAIN_BACKGROUND})`
    }"
  >
    <RouterView />
    <ModalsContainer />
  </div>
</template>
