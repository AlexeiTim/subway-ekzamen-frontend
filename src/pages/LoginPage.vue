<template>
  <div class="flex items-center justify-center h-full w-full">
    <div class="rounded-xl bg-white xl:w-1/4 p-4 max-mobile:w-full">
      <ElText tag="h1" class="text-center">Авторизация</ElText>
      <ElForm :model="formData" label-position="top">
        <ElFormItem label="Логин">
          <ElInput v-model="formData.username" />
        </ElFormItem>

        <ElFormItem label="Пароль">
          <ElInput v-model="formData.password" />
        </ElFormItem>
      </ElForm>
    </div>
  </div>
</template>

<script setup lang="ts">
const formData = ref({
  username: '',
  password: ''
})
</script>