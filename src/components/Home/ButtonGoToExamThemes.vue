<template>
  <ElButton @click="handleGoToExamThemes">
    ОК
  </ElButton>
</template>

<script lang="ts" setup>
import { ROUTER_NAMES } from '@/constants/router';
import { WARNINGS } from '@/constants/warnings';
import { NotificationService } from '@/services/notify/notification';
import { useHomePageStore } from '@/stores/pages/home-page-store';
import { useRouter } from 'vue-router';

const notifyService = new NotificationService()

const router = useRouter()
const homePageStore = useHomePageStore()

const handleGoToExamThemes = () => {
  if (!homePageStore.selectedExam) return notifyService.warning(WARNINGS.NOT_HAVE_SELECTED_EXAM)
  router.push({ name: ROUTER_NAMES.EXAM_THEMES, params: { id: homePageStore.selectedExam.id }})
}
</script>