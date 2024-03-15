import type { Exam } from "@/types/exam";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useHomePageStore = defineStore('home-page-store', () => {
  const selectedExam = ref<Exam | null>(null)

  function setSelectedExam(exam: Exam) {
    selectedExam.value = exam
  }

  function unsetSelectedExam() {
    selectedExam.value = null
  }

  return {
    selectedExam,
    setSelectedExam,
    unsetSelectedExam
  }
})