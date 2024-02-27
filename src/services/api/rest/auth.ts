import makeRequest from '../httpClient'

interface AuthData {
  username: string
  password: string
}

export const login = (data: AuthData) =>
  makeRequest({
    url: '/token/login/',
    method: 'POST',
    data
  })

export const registration = (data: AuthData) =>
  makeRequest({
    url: '/users/',
    method: 'POST',
    data
  })

export const logout = () =>
  makeRequest({
    url: '/token/logout/',
    method: 'POST'
  })
