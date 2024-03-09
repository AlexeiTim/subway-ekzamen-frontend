export interface BaseApi {
  endpoint?: string
  methods?: string[]

  getOne(id: number | string): Promise<any>

  getAll(params: any): Promise<any>

  update(id: number | string, data: any): Promise<any>

  delete(id: number | string): Promise<any>

  create(data: any): Promise<any>
}

export interface BaseFakeApi extends BaseApi {}

export interface BaseResponse<T> {
  data: T
}
