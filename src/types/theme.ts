
export type ThemeId = number
export type ThemeName = string
export type ThemeDescription = string

export interface Theme {
  id: ThemeId
  title: ThemeName
  questions_count: number
  exam: {
    id: number
    themes: number[]
    title: string
    description: string
  }
}

export interface ThemeParams {
  search?: string
  examId?: number
}