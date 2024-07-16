import type { Exam } from "./exam";
import type { Question } from "./question";
import type { Theme } from "./theme";

export interface ExamPractice {
  exam: Exam
  themes: Theme[]
  questions: Question[]
}