import makeRequest from "../httpClient";
import { BaseApiSerivce } from "./base";

class QuestionApiService extends BaseApiSerivce {
  constructor(endpoint: string) {
    super(endpoint)
  }

  getThemeQuestion(themeId: number, params: { questions_count: number }) {
    return makeRequest({
      url: `themes/${themeId}/questions`,
      params
    })
  }
}

export const QuestionService = new QuestionApiService('')