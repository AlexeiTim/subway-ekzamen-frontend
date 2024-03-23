import { ThemeModel } from "@/models"
import { describe, expect, it } from "vitest"

describe('theme.model', () => {
  it('created', () => {
    const data = {
      id: 1,
      name: 'name',
      description: 'description',
      exam: 1
    }

    const themeModel = new ThemeModel(data)

    expect(JSON.stringify(themeModel)).toEqual(JSON.stringify(data))
  })
})