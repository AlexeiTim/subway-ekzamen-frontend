import type { Exam, ExamParams } from "@/types/exam";
import makeRequest from "../httpClient";
import { BaseApiSerivce } from "./base";

class ExamApiService<T, U> extends BaseApiSerivce<T, U> {
  constructor(endpoint: string) {
    super(endpoint)
  }

  async startExamPractice(examId: number) {
    return makeRequest({
      url: '/exams_practice/' + examId
    })
  }
}
export const ExamService = new ExamApiService<Exam, ExamParams>('/exams')
