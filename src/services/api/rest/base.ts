import { API_METHODS, SERVICE_METHOD_ERRORS } from '@/constants/service'
import type { BaseApi, BaseResponse } from '@/types/api'
import makeRequest from '../httpClient'

export class BaseApiSerivce<T, U = null> implements BaseApi {
  constructor(
    public endpoint: string = '',
    public methods: string[] = [
      API_METHODS.GET,
      API_METHODS.CREATE,
      API_METHODS.PARTIAL_UPDATE,
      API_METHODS.UPDATE,
      API_METHODS.DELETE
    ]
  ) {
    this.endpoint = endpoint
    this.methods = methods
  }

  public getOne(id: string | number): Promise<BaseResponse<T>> {
    if (!this.methods.includes(API_METHODS.GET)) throw new Error(SERVICE_METHOD_ERRORS.GET)

    return makeRequest<T>({
      url: `${this.endpoint}/${id}/`
    })
  }

  public getAll(params?: U): Promise<BaseResponse<T[]>> {
    if (!this.methods.includes(API_METHODS.GET)) throw new Error(SERVICE_METHOD_ERRORS.GET)

    return makeRequest<T[]>({
      url: this.endpoint,
      params
    })
  }

  public update(id: string | number, data: Omit<T, 'id'>): Promise<BaseResponse<T>> {
    if (
      !this.methods.includes(API_METHODS.PARTIAL_UPDATE) ||
      !this.methods.includes(API_METHODS.UPDATE)
    )
      throw new Error(SERVICE_METHOD_ERRORS.UPDATE)

    return makeRequest<T>({
      url: `${this.endpoint}/${id}/`,
      data
    })
  }

  public delete(id: string | number): Promise<BaseResponse<T>> {
    if (!this.methods.includes(API_METHODS.DELETE)) throw new Error(SERVICE_METHOD_ERRORS.DELETE)

    return makeRequest<T>({
      url: `${this.endpoint}/${id}/`
    })
  }

  public create(data: Partial<T>): Promise<BaseResponse<T>> {
    if (!this.methods.includes(API_METHODS.CREATE)) throw new Error(SERVICE_METHOD_ERRORS.CREATE)

    return makeRequest<T>({
      url: this.endpoint,
      data
    })
  }
}
