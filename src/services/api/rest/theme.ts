import type { Theme } from '@/types/theme'
import makeRequest from '../httpClient'

class ThemeServiceApi {
  public async getAll(examId: number, params = {}) {
    return makeRequest<Theme[]>({
      url: `/exams/${examId}/themes/`,
      params
    })
  }

  public async getOne(examId: number, themeId: number) {
    return makeRequest<Theme>({
      url: `/exams/${examId}/themes/${themeId}`
    })
  }
}
export const ThemeService = new ThemeServiceApi()
