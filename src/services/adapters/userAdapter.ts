import makeRequest from '../api/httpClient'

export const useUserService = () => {
  return {
    user() {
      return makeRequest({
        url: '/users/me/',
        method: 'GET'
      })
    }
  }
}
