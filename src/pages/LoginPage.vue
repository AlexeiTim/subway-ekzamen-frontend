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
        ref="formRef"
        :model="loginData"
        :rules="formRules"
        label-position="top"
      >
        <ElFormItem
          label="Логин"
          prop="username"
        >
          <ElInput v-model="loginData.username" />
        </ElFormItem>

        <ElFormItem
          label="Пароль"
          prop="password"
        >
          <ElInput v-model="loginData.password" />
        </ElFormItem>
      </ElForm>
      <div class="flex items-center justify-between">
        <span>
          Ещё нет аккаунта?
          <RouterLink :to="{ name: ROUTER_NAMES.REGISTRATION }">
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
import { ROUTER_NAMES } from '@/constants/router';
import { generateWelcomeMessage } from '@/helpers/generateWelcomeMessage';
import { setToken } from '@/services/api/config';
import { AuthService } from '@/services/api/rest/auth';
import { UserService } from '@/services/api/rest/user';
import { NotificationService } from '@/services/notify/notification';
import { useUserStore } from '@/stores/user';
import validator from '@/utils/validator';
import type { FormInstance, FormRules } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const formRef = ref<FormInstance>()

const formRules = ref<FormRules>({
  username: [{ validator: validator.notEmptyField, trigger: 'blur'}],
  password: [{ validator: validator.notEmptyField, trigger: 'blur'}]
})

const { login, loginData } = useLogin()

async function checkValidForm() {
  if (!formRef.value) return

  const isValid = await formRef.value?.validate(isValid => isValid)
  if (!isValid) return false
  return true
}

const handleLogin = async () => {
  const isValidForm = await checkValidForm()
  if (!isValidForm) return

  await login()
}

function useLogin() {
  const authService = new AuthService()
  const userService = new UserService()
  const notificationService = new NotificationService()
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

      userStore.updateUser(user)
      router.push({ name: ROUTER_NAMES.HOME })
      
      const welcomeMessage = generateWelcomeMessage(user.username)
      notificationService.success(welcomeMessage)
    } catch (e) {
      return console.log(ERRORS.NOT_AUTHORIZATION)
    }
  }

  return {
    login,
    loginData
  }
}

defineExpose({
  checkValidForm
})
</script>
