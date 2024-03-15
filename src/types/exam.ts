export type ExamId = number
export type ExamName = string
export type ExamDescription = string

export interface Exam {
  readonly id: ExamId
  readonly name: ExamName
  readonly description?: ExamDescription
}
