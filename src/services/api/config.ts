import axios from 'axios'
import { ElNotification } from 'element-plus'

const csrfHeader = { 'X-CSRFToken': localStorage.getItem('token') }

export const setToken = (newToken: string | null) => {
  console.log(newToken)
  axios.defaults.headers.common['Authorization'] = newToken ? `Token ${newToken}` : ''
  newToken ? localStorage.setItem('token', newToken) : clearToken()
}

export const clearToken = () => {
  localStorage.removeItem('token')
  axios.defaults.headers.common['Authorization'] = ''
}

const mapUrl = {
  local: `${import.meta.env.VITE_APP_API_URL}`,
  prod: `${window.location.origin}/api`
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
