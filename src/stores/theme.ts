import { ThemeService } from "@/services/api/rest/theme"
import type { Theme, ThemeParams } from "@/types/theme"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useThemesStore = defineStore('themes-store', () => {
  const isLoading = ref(false)
  const error = ref<any>(null)
  const themes = ref<Theme[]>([])

  async function getAll(examId: number, params?: ThemeParams) {
    try {
      error.value = null
      isLoading.value = true
      const response = await ThemeService.getAll(examId, params)
      return (themes.value = response.data)
    } catch (e) {
      error.value = e
    } finally {
      isLoading.value = false
    }
  }

  async function getOne(examId: number, themeId: number) {
    try {
      const response = await ThemeService.getOne(examId, themeId)
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  return {
    isLoading,
    error,
    themes,
    getAll,
    getOne
  }
})