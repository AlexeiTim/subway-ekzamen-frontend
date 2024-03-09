import { API_METHODS, SERVICE_METHOD_ERRORS } from '@/constants/service';

type GenericWithId<T> = T & { id: string | number }

function getDataWithTypeID<T>(data: T[]): GenericWithId<T>[] {
  return data as GenericWithId<T>[]
}

export class BaseFakeApiSerivce<T> {
  methods: string[];
  data: T[];
  constructor(
    data: T[]
  ) {
    this.data = data
    this.methods = [
      API_METHODS.GET,
      API_METHODS.CREATE,
      API_METHODS.PARTIAL_UPDATE,
      API_METHODS.UPDATE,
      API_METHODS.DELETE
    ]
  }

  public getOne(id: string | number): Promise<T> {
    if (!this.methods.includes(API_METHODS.GET)) throw new Error(SERVICE_METHOD_ERRORS.GET)

    const currentData = getDataWithTypeID<T>(this.data)
    const item = currentData.find(c => c.id === id)
    if (!item) return Promise.resolve(null as T)

    return Promise.resolve(item as T)
  }

  public getAll(params: Partial<T> = {}): Promise<T[]> {
    if (!this.methods.includes(API_METHODS.GET)) throw new Error(SERVICE_METHOD_ERRORS.GET)

    const filterParams = Object.entries(params)
    if (filterParams.length !== 0)
      return Promise.resolve(this.data)
    
    const filteredData = this.data.filter(
      d => filterParams.every(
        ([key, value]) => {
          const dataKey = key as keyof T
          if (typeof value === 'string') {
            const dataValue = d[dataKey]
            return value.includes(dataValue as string)
          }
        }
      )
    )
    return Promise.resolve(filteredData)
  }

  public update(id: string | number, body: Omit<T, 'id'>): Promise<T> {
    if (
      !this.methods.includes(API_METHODS.PARTIAL_UPDATE) ||
      !this.methods.includes(API_METHODS.UPDATE)
    )
      throw new Error(SERVICE_METHOD_ERRORS.UPDATE)

    const currentData = getDataWithTypeID<T>(this.data)
    const updatedItem = currentData.find(d => d.id === id)
    if (!updatedItem)
      return Promise.resolve({} as T)
    
    return Promise.resolve({
      ...updatedItem,
      ...body
    })
  }

  public delete(id: string | number): Promise<T> {
    if (!this.methods.includes(API_METHODS.DELETE)) throw new Error(SERVICE_METHOD_ERRORS.DELETE)

    const currentData = getDataWithTypeID<T>(this.data)
    const findItem = currentData.find(c => c.id === id)
    if (!findItem) return Promise.resolve({} as T)

    return Promise.resolve(findItem as T)
  }

  public create(body: Partial<T>): Promise<GenericWithId<T>> {
    if (!this.methods.includes(API_METHODS.CREATE)) throw new Error(SERVICE_METHOD_ERRORS.CREATE)

    const newItem = {
      ...body,
      id: Date.now()
    }

    return Promise.resolve(newItem as GenericWithId<T>)
  }
}
