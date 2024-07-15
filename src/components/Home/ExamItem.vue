<template>
  <ElButton
    :type="buttonType"
    style="margin-left: 0; height: 40px; justify-content: start;"
    @click="homePageStore.setSelectedExam(props.exam)"
  >
    {{ props.exam.title }}
  </ElButton>
</template>

<script lang="ts" setup>
import { useHomePageStore } from '@/stores/pages/home-page-store';
import type { Exam } from '@/types/exam';
import { computed } from 'vue';

interface Props {
  exam: Exam
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