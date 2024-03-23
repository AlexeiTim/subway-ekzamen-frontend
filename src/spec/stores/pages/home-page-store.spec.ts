import { useHomePageStore } from "@/stores/pages"
import { createPinia, setActivePinia } from "pinia"
import { beforeEach, describe, expect, it } from "vitest"

const testExam = {
  "id": 1,
  "name": "Первый экзамен"
}

describe('home-page-store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('test init state', () => {
    const homePageStore = useHomePageStore()
    expect(homePageStore.selectedExam).toBe(null)
  })

  it('test setSelectedExam', () => {
    const homePageStore = useHomePageStore()
    expect(homePageStore.selectedExam).toBe(null)
    homePageStore.setSelectedExam(testExam)

    expect(homePageStore.selectedExam?.id).toBe(testExam.id)
    expect(homePageStore.selectedExam?.name).toBe(testExam.name)
  })

  it('test unsetSelectedExam', () => {
    const homePageStore = useHomePageStore()

    expect(homePageStore.selectedExam).toBe(null)
    homePageStore.setSelectedExam(testExam)
    expect(homePageStore.selectedExam?.id).toBe(testExam.id)
    homePageStore.unsetSelectedExam()
    expect(homePageStore.selectedExam).toBe(null)
  })
})