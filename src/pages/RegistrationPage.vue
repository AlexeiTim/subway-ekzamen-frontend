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
        ref="formRef"
        :model="registrationData"
        :rules="formRules"
        label-position="top"
      >
        <ElFormItem
          label="Логин"
          prop="username"
        >
          <ElInput v-model="registrationData.username" />
        </ElFormItem>

        <ElFormItem
          label="Пароль"
          prop="password"
        >
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
import { REGISTRATION_MESSAGES } from '@/constants/auth';
import { ROUTER_NAMES } from '@/constants/router';
import { AuthService } from '@/services/api/rest/auth';
import { NotificationService } from '@/services/notify/notification';
import Validator from '@/utils/validator';
import type { FormInstance, FormRules } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const formRef = ref<FormInstance>()

const { registrationData, registration } = useRegistration()

const handleRegistration = async () => {
  const isValid = await checkValidForm()
  if (!isValid) return

  await registration()
}

const formRules = ref<FormRules>({
  username: [{ validator: Validator.notEmptyField, trigger: 'blur'}],
  password: [{ validator: Validator.notEmptyField, trigger: 'blut'}]
})

async function checkValidForm() {
  if (!formRef.value) return

  return await formRef.value.validate((isValid) => isValid)
}

function useRegistration() {
  const authService = new AuthService()
  const notificationService = new NotificationService()
  const router = useRouter()

  const registrationData = ref({
    username: '',
    password: '',
  })

  async function registration() {
    const { data: user } = await authService.registration(registrationData.value)

    if (!user) return
    
    router.push({ name: ROUTER_NAMES.LOGIN })
    notificationService.success(REGISTRATION_MESSAGES.SUCCESS)
  }

  return {
    registrationData,
    registration
  }
}

defineExpose({
  checkValidForm
})
</script>
