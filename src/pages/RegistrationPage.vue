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
          <ElInput
            ref="usernameField"
            v-model="registrationData.username"
            data-testid="username-input"
          />
        </ElFormItem>

        <ElFormItem
          label="Пароль"
          prop="password"
        >
          <ElInput
            v-model="registrationData.password"
            data-testid="password-input"
            :type="passowrdType"
          >
            <template #suffix>
              <ElIcon
                class="cursor-pointer"
                @click="toggleTypePassword"
              >
                <View v-if="passowrdType === 'password'" />
                <Hide v-else/>
              </ElIcon>
            </template>
          </ElInput>
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
          data-testid="submit-button"
          @click="handleRegistration(formRef as FormInstance)"
        >
          Зарегестрироваться
        </ElButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRegistration } from '@/composables/useRegistration'
import { checkValidForm } from '@/helpers/form/checkValidForm'
import { Validator } from '@/utils/validator'
import { Hide, View } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ref } from 'vue'

const { registration } = useRegistration()

const registrationData = ref({
  username: '',
  password: ''
})
const formRef = ref<FormInstance>()
  const formRules = ref<FormRules>({
  username: [{ required: true, trigger: 'blur', min: 8, message: 'Минимум 8 символов' }],
  password: [{ required: true, trigger: 'blur', min: 8, message: 'Минимум 8 символов' }]
});
const passowrdType = ref('password')

function toggleTypePassword() {
  passowrdType.value = passowrdType.value === 'password' ? 'text' : 'password'
}
const handleRegistration = async (formRef: FormInstance) => {
  if (!formRef) return

  const { isValid } = await checkValidForm(formRef)
  if (!isValid) return

  await registration(registrationData.value)
}
</script>
