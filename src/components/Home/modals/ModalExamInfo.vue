<template>
  <VueFinalModalBase
    :title="MODAL_TITLE"
    @close="emits('close')"
  >
    <h1>{{ selectedExam?.name }}</h1>
    <p>{{ examDescription }}</p>
  </VueFinalModalBase>
</template>

<script lang="ts" setup>
import VueFinalModalBase from '@/components/Modals/VueFinalModalBase.vue';
import { useHomePageStore } from '@/stores/pages/home-page-store';
import { computed } from 'vue';

const MODAL_TITLE = 'Информация о экзамене'

const { selectedExam } = useHomePageStore()

const examDescription = computed(() => {
  return selectedExam?.description || 'Информация отсутствует'
})

const emits = defineEmits<{
  (e: 'close'): void
}>()
</script>