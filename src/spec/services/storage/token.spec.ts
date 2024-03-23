import { TOKEN } from "@/constants/storage"
import { TokenStorage } from "@/services/storage/token"
import { beforeEach, describe, expect, it } from "vitest"

const tokenName = 'test'
const updatedTokenName = 'test2'

describe('token storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('set token', () => {
    const tokenStorage = new TokenStorage()

    expect(localStorage.getItem(TOKEN)).toBe(null)
    tokenStorage.setToken(tokenName)

    expect(localStorage.getItem(TOKEN)).toBe(tokenName)
  })

  it('get token', () => {
    const tokenStorage = new TokenStorage()

    expect(localStorage.getItem(TOKEN)).toBe(null)
    tokenStorage.setToken(tokenName)
    const resultToken = tokenStorage.getToken()

    expect(resultToken).toBe(tokenName)
  })

  it('delete token', () => {
    const tokenStorage = new TokenStorage()

    expect(localStorage.getItem(TOKEN)).toBe(null)
    tokenStorage.setToken(tokenName)
    expect(localStorage.getItem(TOKEN)).toBe(tokenName)
    tokenStorage.deleteToken()

    expect(localStorage.getItem(TOKEN)).toBe(null)
  })

  it('update token', () => {
    const tokenStorage = new TokenStorage()

    expect(localStorage.getItem(TOKEN)).toBe(null)
    tokenStorage.setToken(tokenName)
    expect(localStorage.getItem(TOKEN)).toBe(tokenName)
    tokenStorage.updateToken(updatedTokenName)

    expect(localStorage.getItem(TOKEN)).toBe(updatedTokenName)
  })
})