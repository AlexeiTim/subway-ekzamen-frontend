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
import { ExamModel } from '@/models/exam.model';
import { ExamFakeService } from '@/services/api/fake/exam';
import { onMounted, ref } from 'vue';
import ExamItem from './ExamItem.vue';

const { exams } = useExam()

function useExam() {
  const examService = new ExamFakeService()
  const exams = ref<ExamModel[]>([])

  async function loadExams() {
    const response = await examService.getAll()
    exams.value = response.map(r => new ExamModel(r))
  }

  onMounted(async () => {
    await loadExams()
  })

  return {
    exams,
  }
}
</script>