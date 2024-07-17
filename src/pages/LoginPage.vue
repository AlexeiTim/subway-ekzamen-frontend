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
          <ElInput
            v-model="loginData.password"
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
          <RouterLink :to="{ name: 'registration' }">
            <ElLink>Зарегистрироваться</ElLink>
          </RouterLink>
        </span>
        <ElButton
          type="primary"
          @click="handleLogin(formRef as FormInstance)"
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
import { View } from '@element-plus/icons-vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ref } from 'vue';

const { login } = useLogin();

const loginData = ref({
  username: localStorage.getItem('username') || '',
  password: localStorage.getItem('password') || ''
});
const passowrdType = ref('password');

function toggleTypePassword() {
  passowrdType.value = passowrdType.value === 'password' ? 'text' : 'password';
}

const formRef = ref<FormInstance>();
const formRules = ref<FormRules>({
  username: [{ required: true, trigger: 'blur', min: 8, message: 'Минимум 8 символов' }],
  password: [{ required: true, trigger: 'blur', min: 8, message: 'Минимум 8 символов' }]
});

const handleLogin = async (formRef: FormInstance) => {
  if (!formRef) return;

  const { isValid } = await checkValidForm(formRef);
  if (!isValid) return;

  await login(loginData.value);
};
</script>
