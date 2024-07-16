import { QuestionService } from "@/services/api/rest/questions"
import type { Question } from "@/types/question"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useQuestionsStore = defineStore('questions-store', () => {
  const isLoading = ref(false)
  const error = ref<any>(null)
  const questions = ref<Question[]>([])

  async function getQuestions(themeId: number, params: { questions_count: number }) {
    try {
      const response = await QuestionService.getThemeQuestion(themeId, params)
      return (questions.value = response.data)
    } catch (e) {
      console.error(e)
    }
  }

  return {
    getQuestions,
    questions,
    error,
    isLoading
  }
})