import { useExamStore } from "@/stores/exam"
import { createPinia, setActivePinia } from "pinia"
import { beforeEach, describe, expect, it } from "vitest"

describe('exam-store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('initial state', () => {
    const examStore = useExamStore()
    
    expect(examStore.exams.length).toBe(0)
    expect(examStore.error).toBe(null)
    expect(examStore.loading).toBe(false)
  })
})