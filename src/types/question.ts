import type { Answer } from "./answer"
import type { Theme } from "./theme"

export interface Question {
  id: number,
  answers: Answer[],
  theme: Theme,
  text: string
}