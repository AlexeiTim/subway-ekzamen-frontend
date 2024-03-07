<template>
  <div class="flex items-center justify-center h-full w-full">
    <div class="rounded-xl bg-white p-4 w-[500px]">
      <ElText
        tag="h1"
        class="text-center"
      >
        Авторизация
      </ElText>
      <ElForm
        :model="loginData"
        label-position="top"
      >
        <ElFormItem label="Логин">
          <ElInput v-model="loginData.username" />
        </ElFormItem>

        <ElFormItem label="Пароль">
          <ElInput v-model="loginData.password" />
        </ElFormItem>
      </ElForm>
      <div class="flex items-center justify-between">
        <span>
          Ещё нет аккаунта?
          <RouterLink :to="{ name: 'registration' }">
            <ElLink>Зарегистрироваться</ElLink>
          </RouterLink>
        </span>
        <ElButton
          type="primary"
          @click="handleLogin"
        >
          Войти
        </ElButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ERRORS } from '@/constants/errors';
import { ROUTER_PATHES } from '@/constants/router';
import UserModel from '@/models/user.model';
import { setToken } from '@/services/api/config';
import { AuthService } from '@/services/api/rest/auth';
import { UserService } from '@/services/api/rest/user';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { login, loginData } = useLogin()

const handleLogin = async () => await login()

function useLogin() {
  const authService = new AuthService()
  const userService = new UserService()
  const userStore = useUserStore()
  const router = useRouter()

  const loginData = ref({
    username: '',
    password: '',
  })

  async function login() {
    const { username, password } = loginData.value

    try {
      const { data: authData } = await authService.login({ username, password })

      if (!authData) return alert('bad request')

      setToken(authData.auth_token)
    } catch (e) {
      return console.log(ERRORS.NOT_AUTHORIZATION)
    }

    try {
      const { data: user } = await userService.getCurrentUser()

      if (!user) return alert('dont have user')

      userStore.updateUser(new UserModel(user))
      router.push(ROUTER_PATHES.HOME)
    } catch (e) {
      return console.log('проблемы с авторизацией')
    }
  }

  return {
    login,
    loginData
  }
}
</script>
