import type { Question } from "@/types/question";
import makeRequest from "../httpClient";
import { BaseApiSerivce } from "./base";

class QuestionApiService<T> extends BaseApiSerivce<T> {
  constructor(endpoint: string) {
    super(endpoint)
  }

  getThemeQuestion(themeId: number, params: { questions_count: number }) {
    return makeRequest<Question[]>({
      url: `themes/${themeId}/questions`,
      params
    })
  }
}

export const QuestionService = new QuestionApiService<Question>('')