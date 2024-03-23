import { useExamThemesPageStore } from "@/stores/pages"
import { createPinia, setActivePinia } from "pinia"
import { beforeEach, describe, expect, it } from "vitest"

const testTheme = {
  "id": 1,
  "name": "Первое название темы",
  "description": "Описание темы экзамена",
  "exam": 1
}

describe('exam-themes-page-store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initial state', () => {
    const examThemesPageStore = useExamThemesPageStore()
    expect(examThemesPageStore.selectedTheme).toBe(null)
  })
  
  it('set Selected Theme', () => {
    const examThemesPageStore = useExamThemesPageStore()
    expect(examThemesPageStore.selectedTheme).toBe(null)

    examThemesPageStore.setSelectedTheme(testTheme)

    expect(examThemesPageStore.selectedTheme?.id).toBe(testTheme.id)
    expect(examThemesPageStore.selectedTheme?.name).toBe(testTheme.name)
    expect(examThemesPageStore.selectedTheme?.description).toBe(testTheme.description)
    expect(examThemesPageStore.selectedTheme?.exam).toBe(testTheme.exam)
  })
})