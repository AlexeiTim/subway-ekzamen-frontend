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
        :model="formData"
        label-position="top"
      >
        <ElFormItem label="Логин">
          <ElInput v-model="formData.username" />
        </ElFormItem>

        <ElFormItem label="Пароль">
          <ElInput v-model="formData.password" />
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
          @click="handleLoginUser"
        >
          Войти
        </ElButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthentication } from '@/application/authentication';
import { ref } from 'vue';

const { authentication } = useAuthentication()

const formData = ref({
  username: '',
  password: ''
})

const handleLoginUser = async () => authentication(formData.value)
</script>
