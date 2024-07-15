import type { ExamId } from "./exam"

export type ThemeId = number
export type ThemeName = string
export type ThemeDescription = string

export interface Theme {
  id: ThemeId
  name: ThemeName
  description: ThemeDescription
  exam: ExamId
}

export interface ThemeParams {
  search?: string
  examId?: number
}