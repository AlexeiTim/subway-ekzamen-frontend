import type { Theme } from "@/types/theme";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useExamThemesPageStore = defineStore('exam-themes-page-store', () => {
  const selectedTheme = ref<Theme | null>(null)

  function setSelectedTheme(theme: Theme | null) {
    selectedTheme.value = theme
  }

  return {
    selectedTheme,
    setSelectedTheme
  }
})