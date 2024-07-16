import type { Exam, ExamParams } from "@/types/exam";
import type { ExamPractice } from "@/types/exam-practice";
import makeRequest from "../httpClient";
import { BaseApiSerivce } from "./base";

class ExamApiService<T, U> extends BaseApiSerivce<T, U> {
  constructor(endpoint: string) {
    super(endpoint)
  }

  async startExamPractice(examId: number) {
    return makeRequest<ExamPractice>({
      url: '/exams_practice/' + examId
    })
  }
}
export const ExamService = new ExamApiService<Exam, ExamParams>('/exams')
