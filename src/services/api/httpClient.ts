import axios, { type ResponseType } from 'axios'
import config from './config'

const baseHeaders = import.meta.env.DEV ? { ...config.csrfHeader } : {}

export interface IRequest {
  url: string
  method?: string
  responseType?: ResponseType
  headers?: any
  params?: any
  data?: any
  paramsSerializer?: (params: object | string) => string
}

export const makeRequest = <T>({
  url = '/',
  method = 'get',
  headers,
  params,
  data,
  responseType = 'json',
  paramsSerializer
}: IRequest): Promise<T> => {
  return axios({
    url,
    method,
    responseType,
    headers: { ...baseHeaders, ...headers },
    params,
    data,
    paramsSerializer,
    withCredentials: false
  })
}

export default makeRequest
