import axios from 'axios'
import { TokenStorage } from '../storage/token'
import { ElNotification } from 'element-plus'

const csrfHeader = { 'X-CSRFToken': localStorage.getItem('token') }

export const setToken = (newToken: string | null) => {
  const tokenStorage = new TokenStorage()
  axios.defaults.headers.common['Authorization'] = newToken ? `Token ${newToken}` : ''
  newToken ? tokenStorage.updateToken(newToken) : clearToken()
}

export const clearToken = () => {
  const tokenStorage = new TokenStorage()
  tokenStorage.deleteToken()

  axios.defaults.headers.common['Authorization'] = ''
}

const mapUrl = {
  local: `${import.meta.env.VITE_APP_API_URL}`,
  prod: `https://subway-ekzament-backend.onrender.com/api`
}

const apiBaseURL = window.location.hostname === 'localhost' ? mapUrl.local : mapUrl.prod

axios.defaults.baseURL = apiBaseURL

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    ElNotification({
      title: 'Ошибка',
      message: error.response.data.message,
      type: 'error'
    })

    if (error.response.status === 401 || error.response.status === 403) {
      clearToken()
    }

    return Promise.reject(error)
  }
)

export default {
  csrfHeader,
  setToken,
  clearToken
}
