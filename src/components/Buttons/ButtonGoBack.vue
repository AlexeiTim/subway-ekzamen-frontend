<template>
  <ElButton @click="handleGoBack">
    Назад
  </ElButton>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const handleGoBack = () => router.go(-1)
</script>