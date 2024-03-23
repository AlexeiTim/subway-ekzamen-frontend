import { AuthService } from "@/services/api/rest/auth"
import { afterEach, describe, expect, it, vi } from "vitest"

const makeRequestMock = vi.fn().mockReturnValue('mocked')
vi.mock('@/services/api/httpClient', () => ({
  default: () => makeRequestMock()
}))

const authData = {
  username: '',
  password: ''
}

describe('authService', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('login', async () => {
    const authService = new AuthService()

    await authService.login(authData)

    expect(makeRequestMock).toHaveBeenCalled()
  })

  it('registration', async () => {
    const authService = new AuthService()

    await authService.registration(authData)

    expect(makeRequestMock).toHaveBeenCalled()
  })

  it('logout', async () => {
    const authService = new AuthService()

    await authService.logout()

    expect(makeRequestMock).toHaveBeenCalled()
  })
})