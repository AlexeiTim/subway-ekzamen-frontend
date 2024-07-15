import type { BaseResponse } from "@/types/api";
import type { Theme, ThemeParams } from "@/types/theme";
import makeRequest from "../httpClient";
import { BaseApiSerivce } from "./base";

class ThemeServiceApi<T, U> extends BaseApiSerivce<T, U> {
  constructor(endpoint: string) {
    super(endpoint)
  }

  public async getAll(examId: number, params = {}): Promise<BaseResponse<T[]>> {
    return makeRequest({
      url: `/exams/${examId}/themes/`,
      params
    })
  }
}
export const ThemeService = new ThemeServiceApi<Theme, ThemeParams>('/exam/themes')
