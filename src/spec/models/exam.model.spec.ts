import { ExamModel } from "@/models"
import { describe, expect, it } from "vitest"

describe('exam.model', () => {
  it('created', () => {
    const data = {
      id: 1,
      name: 'name',
      description: 'description'
    }
    const examModel = new ExamModel(data)

    expect(JSON.stringify(examModel)).toEqual(JSON.stringify(data))
  })
})