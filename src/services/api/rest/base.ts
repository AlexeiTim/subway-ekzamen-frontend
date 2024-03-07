import { API_METHODS, SERVICE_METHOD_ERRORS } from '@/constants/service'
import type { BaseApi } from '@/types/api'
import makeRequest from '../httpClient'

export class BaseApiSerivce implements BaseApi {
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

  public getOne(id: string | number): Promise<any> {
    if (!this.methods.includes(API_METHODS.GET)) throw new Error(SERVICE_METHOD_ERRORS.GET)

    return makeRequest({
      url: `${this.endpoint}/${id}/`
    })
  }

  public getAll(params: any): Promise<any> {
    if (!this.methods.includes(API_METHODS.GET)) throw new Error(SERVICE_METHOD_ERRORS.GET)

    return makeRequest({
      url: this.endpoint,
      params
    })
  }

  public update(id: string | number, data: any): Promise<any> {
    if (
      !this.methods.includes(API_METHODS.PARTIAL_UPDATE) ||
      !this.methods.includes(API_METHODS.UPDATE)
    )
      throw new Error(SERVICE_METHOD_ERRORS.UPDATE)

    return makeRequest({
      url: `${this.endpoint}/${id}/`,
      data
    })
  }

  public delete(id: string | number): Promise<any> {
    if (!this.methods.includes(API_METHODS.DELETE)) throw new Error(SERVICE_METHOD_ERRORS.DELETE)

    return makeRequest({
      url: `${this.endpoint}/${id}/`
    })
  }

  public create(data: any): Promise<any> {
    if (!this.methods.includes(API_METHODS.CREATE)) throw new Error(SERVICE_METHOD_ERRORS.CREATE)

    return makeRequest({
      url: this.endpoint,
      data
    })
  }
}
