<template>
  <VueFinalModalBase
    :title="MODAL_TITLE"
    @close="emits('close')"
  >
    <div
      v-for="theme in themesStore.themes"
      :key="theme.id"
      class="flex items-center justify-between"
    >
      {{ theme }}
      <h1>{{ theme.title }}</h1>
    </div>
  </VueFinalModalBase>
</template>

<script lang="ts" setup>
import VueFinalModalBase from '@/components/Modals/VueFinalModalBase.vue'
import { useThemesStore } from '@/stores/theme'

const themesStore = useThemesStore()

const emits = defineEmits<{
  (e: 'close'): void
}>()

const MODAL_TITLE = 'Настройка экзамена'
</script>
