<template>
  <ElButton @click="handleOpenExamInfoModal">
    Об экзамене
  </ElButton>
</template>

<script lang="ts" setup>
import { WARNINGS } from '@/constants/warnings';
import { NotificationService } from '@/services/notify/notification';
import { useHomePageStore } from '@/stores/pages/home-page-store';
import { useModal } from 'vue-final-modal';
import ModalExamInfo from './modals/ModalExamInfo.vue';

const notifyService = new NotificationService()

const homePageStore = useHomePageStore()
const { open: openExamInfoModal, close: closeExamInfoModal } = useModal({
  component: ModalExamInfo,
  attrs: {
    onClose() {
      closeExamInfoModal()
    }
  }
})

const handleOpenExamInfoModal = () => {
  if (!homePageStore.selectedExam) return notifyService.warning(WARNINGS.NOT_HAVE_SELECTED_EXAM)
  openExamInfoModal()
}
</script>