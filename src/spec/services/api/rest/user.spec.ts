import { UserService } from "@/services/api/rest/user";
import { describe, expect, it, vi } from "vitest";
const makeRequestMock = vi.fn()
vi.mock('@/services/api/httpClient', () => {
  return {
    default: () => makeRequestMock()
  }
})

describe('userService', () => {
  it('getCurrentUser', async () => {
    const userService = new UserService()

    await userService.getCurrentUser()

    expect(makeRequestMock).toHaveBeenCalled()
  })
})