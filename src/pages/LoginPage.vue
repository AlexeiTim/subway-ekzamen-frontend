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
          data-testid="username-form-item"
        >
          <ElInput v-model="loginData.username" />
        </ElFormItem>

        <ElFormItem
          label="Пароль"
          prop="password"
          data-testid="password-form-item"
        >
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
          @click="handleLogin((formRef as FormInstance))"
        >
          Войти
        </ElButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLogin } from '@/composables/useLogin';
import { checkValidForm } from '@/helpers/form/checkValidForm';
import { Validator } from '@/utils/validator';
import type { FormInstance, FormRules } from 'element-plus';
import { ref } from 'vue';

const { login } = useLogin()

const loginData = ref({
    username: '',
    password: '',
  })

const formRef = ref<FormInstance>()
const formRules = ref<FormRules>({
  username: [{ validator: Validator.notEmptyField, trigger: 'blur'}],
  password: [{ validator: Validator.notEmptyField, trigger: 'blur'}]
})

const handleLogin = async (formRef: FormInstance) => {
  if (!formRef) return

  const { isValid } = await checkValidForm(formRef)
  if (!isValid) return

  await login(loginData.value)
}
</script>
