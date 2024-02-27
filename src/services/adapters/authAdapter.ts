import makeRequest from '../api/httpClient'

interface AuthData {
  username: string
  password: string
}

export const useAuth = () => {
  return {
    login(data: AuthData) {
      return makeRequest({
        url: '/token/login/',
        method: 'POST',
        data
      })
    },
    logout() {
      return makeRequest({
        url: '/token/logout/',
        method: 'POST'
      })
    },
    registration(data: AuthData) {
      return makeRequest({
        url: '/users/',
        method: 'POST',
        data
      })
    }
  }
}
