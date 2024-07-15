<template>
  <div class="flex flex-col gap-1">
    <ExamItem
      v-for="exam in examsStore.exams"
      :key="exam.id"
      :exam="exam"
    />
  </div>
</template>

<script setup lang="ts">
import { useExamsStore } from '@/stores/exam';
import { onMounted } from 'vue';
import ExamItem from './ExamItem.vue';

const examsStore = useExamsStore()

onMounted(() => {
  examsStore.getAll()
})
</script>