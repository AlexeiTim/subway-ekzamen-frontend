export type ExamId = number
export type ExamName = string
export type ExamDescription = string

export interface Exam {
  readonly id: ExamId
  readonly title: ExamName
  readonly themes: number[]
  readonly description?: ExamDescription
}

export interface ExamParams {
  readonly search?: string
}