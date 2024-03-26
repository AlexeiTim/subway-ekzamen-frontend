<template>
  <VueFinalModalBase
    :title="MODAL_TITLE"
    @close="emits('close')"
  >
    <h1>Content</h1>
  </VueFinalModalBase>
</template>

<script lang="ts" setup>
import VueFinalModalBase from '@/components/Modals/VueFinalModalBase.vue';

const MODAL_TITLE = 'Информация о вопросе'
const emits = defineEmits<{
  (e: 'close'): void
}>()
</script>