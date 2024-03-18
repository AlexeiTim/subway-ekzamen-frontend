import { BaseApiSerivce } from "@/services/api/rest/base";
import { describe, expect, it, vi } from "vitest";

const testData = [{ id: 1, text: 'test 1' }, { id: 2, text: 'test 2' }]

const mockGetAll = vi.fn().mockImplementation(() => Promise.resolve(testData))
const mockGetOne = vi.fn().mockImplementation(() => Promise.resolve(testData[0]))
const mockUpdate = vi.fn().mockImplementation(() => Promise.resolve(testData.map(d => ({
  ...d,
  text: 'update'
}))))
const mockDelete = vi.fn().mockImplementation(() => Promise.resolve(testData.slice(0, 1)))
const mockCreate = vi.fn().mockImplementation(() => Promise.resolve([...testData, { id: 3, text: 'test 3' }]))

const spyGetAll = vi.spyOn(BaseApiSerivce.prototype, 'getAll')
spyGetAll.mockImplementation(mockGetAll)

const spyGetOne = vi.spyOn(BaseApiSerivce.prototype, 'getOne')
spyGetOne.mockImplementation(mockGetOne)

const spyUpdate = vi.spyOn(BaseApiSerivce.prototype, 'update')
spyUpdate.mockImplementation(mockUpdate)

const spyDelete = vi.spyOn(BaseApiSerivce.prototype, 'delete')
spyDelete.mockImplementation(mockDelete)

const spyCreate = vi.spyOn(BaseApiSerivce.prototype, 'create')
spyCreate.mockImplementation(mockCreate)

describe('BaseApiService', () => {
  const apiService = new BaseApiSerivce()

  it('get all', async () => {
    const result = await apiService.getAll()

    expect(result.length).toEqual(2)
    expect(spyGetAll).toHaveBeenCalled()
  })

  it('get one', async () => {
    const result = await apiService.getOne(1)

    expect(result).toEqual(testData[0])
    expect(spyGetOne).toHaveBeenCalledWith(1)
    expect(Object.entries(result).length).toEqual(2)
  })

  it('delete', async () => {
    const result = await apiService.delete(1)

    expect(result.length).toEqual(1)
    expect(spyDelete).toHaveBeenCalledWith(1)
  })

  it('create', async () => {
    const result = await apiService.create({ id: 1, text: 'test 3' })

    expect(result.length).toEqual(3)
    expect(spyCreate).toHaveBeenCalledWith({
      id: 1,
      text: 'test 3'
    })
  })

  it('update', async () => {
    const result = await apiService.update(1, { text: 'update' })
    expect(spyUpdate).toHaveBeenCalledWith(1, { text: 'update' })
    expect(result[0].text).toEqual('update')
  })
})