<template>
  <div class="flex flex-col gap-1">
    <ExamItem
      v-for="exam in exams"
      :key="exam.id"
      :exam="exam"
    />
  </div>
</template>

<script setup lang="ts">
import examsDB from '@/db/exams.json';
import { ExamModel } from '@/models/exam.model';
import { onMounted, ref } from 'vue';
import ExamItem from './ExamItem.vue';

const { exams } = useExam()

function useExam() {
  const exams = ref<ExamModel[]>([])

  async function loadExams() {
    exams.value = examsDB.map(r => new ExamModel(r))
  }

  onMounted(async () => {
    await loadExams()
  })

  return {
    exams,
  }
}
</script>