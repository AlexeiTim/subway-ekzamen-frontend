import { ExamService } from "@/services/api/rest/exam";
import type { Exam } from "@/types/exam";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useExamsStore = defineStore('exam-store', () => {
  const isLoading = ref(false)
  const error = ref<any>(null)
  const exams = ref<Exam[]>([])

  async function getAll(params?: { search: string }) {
    try {
      error.value = null
      isLoading.value = true
      const response = await ExamService.getAll(params)
      return (exams.value = response.data)
    } catch (e) {
      error.value = e
    } finally {
      isLoading.value = false
    }
  }

  async function getOne(examId: number) {
    try {
      error.value = null
      isLoading.value = true
      const response = await ExamService.getOne(examId)
      return response.data
    } catch (e) {
      error.value = e
    } finally {
      isLoading.value = false
    }
  }
  return {
    isLoading,
    error,
    exams,
    getAll,
    getOne
  }
})