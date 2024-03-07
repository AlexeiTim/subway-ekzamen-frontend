<template>
  <div class="flex items-center justify-center h-full w-full">
    <div class="rounded-xl bg-white p-4 w-[500px]">
      <ElText
        tag="h1"
        class="text-center"
      >
        Регистрация
      </ElText>
      <ElForm
        :model="registrationData"
        label-position="top"
      >
        <ElFormItem label="Логин">
          <ElInput v-model="registrationData.username" />
        </ElFormItem>

        <ElFormItem label="Пароль">
          <ElInput v-model="registrationData.password" />
        </ElFormItem>
      </ElForm>
      <div class="flex items-center justify-between">
        <span>
          Ещё нет аккаунта?
          <RouterLink :to="{ name: 'login' }">
            <ElLink>Войти</ElLink>
          </RouterLink>
        </span>
        <ElButton
          type="primary"
          @click="handleRegistration"
        >
          Зарегестрироваться
        </ElButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ROUTER_NAMES } from '@/constants/router';
import { AuthService } from '@/services/api/rest/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { registrationData, registration } = useRegistration()

const handleRegistration = async () => await registration()

function useRegistration() {
  const authService = new AuthService()
  const router = useRouter()

  const registrationData = ref({
    username: '',
    password: '',
  })

  async function registration() {
    const { data: user } = await authService.registration(registrationData.value)

    if (!user) return
    
    router.push({ name: ROUTER_NAMES.LOGIN })
  }

  return {
    registrationData,
    registration
  }
}
</script>
