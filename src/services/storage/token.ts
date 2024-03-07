import { TOKEN } from "@/constants/storage";

export class TokenStorage {
  setToken(token: string): void {
    localStorage.setItem(TOKEN, token)
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN)
  }

  deleteToken(): void {
    localStorage.removeItem(TOKEN)
  }

  updateToken(token: string): void {
    localStorage.removeItem(TOKEN)
    localStorage.setItem(TOKEN, token)
  }
}