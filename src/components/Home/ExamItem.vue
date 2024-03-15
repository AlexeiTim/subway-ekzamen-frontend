<template>
  <ElButton
    :type="buttonType"
    style="margin-left: 0; height: 40px; justify-content: start;"
    @click="homePageStore.setSelectedExam(props.exam)"
  >
    {{ props.exam.name }}
  </ElButton>
</template>

<script lang="ts" setup>
import type { ExamModel } from '@/models/exam.model';
import { useHomePageStore } from '@/stores/pages/home-page-store';
import { computed } from 'vue';

interface Props {
  exam: ExamModel
}

const props = defineProps<Props>()

const homePageStore = useHomePageStore()

const isActive = computed(() => {
  if (!homePageStore.selectedExam) return false
  return homePageStore.selectedExam.id === props.exam.id
})

const buttonType = computed(() => {
  return isActive.value ? 'primary' : 'info'
})
</script>