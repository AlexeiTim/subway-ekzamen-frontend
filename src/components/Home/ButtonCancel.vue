<template>
  <ElButton @click="handleUnsetSelectedExam">
    Отмена
  </ElButton>
</template>

<script lang="ts" setup>
import { useHomePageStore } from '@/stores/pages/home-page-store';

const homePageStore = useHomePageStore()

const handleUnsetSelectedExam = () => homePageStore.unsetSelectedExam()
</script>