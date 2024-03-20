import { API_METHODS, SERVICE_METHOD_ERRORS } from "@/constants/service";
import { BaseApiSerivce } from "@/services/api/rest/base";
import { describe, expect, it, vi } from "vitest";

const spyMakeRequest = vi.fn().mockReturnValue('mocked')
vi.mock('@/services/api/httpClient', () => ({
  default: () => spyMakeRequest()
}))

describe('BaseApiService', async () => {
  describe('get all', () => {
    it('get all with not allowed method', async () => {
      const apiService = new BaseApiSerivce('', [API_METHODS.CREATE])

      expect(() => apiService.getAll()).toThrowError(SERVICE_METHOD_ERRORS.GET)
    })

    it('get all with allowed method', async () => {
      const apiService = new BaseApiSerivce('')

      await apiService.getAll()

      expect(spyMakeRequest).toHaveBeenCalled()
    })
  })

  describe('get one', () => {
    it('get one with not allowed method', async () => {
      const apiService = new BaseApiSerivce('', [API_METHODS.CREATE])

      expect(() => apiService.getOne(1)).toThrowError(SERVICE_METHOD_ERRORS.GET)
    })

    it('get one with allowed method', async () => {
      const apiService = new BaseApiSerivce('')

      await apiService.getOne(1)

      expect(spyMakeRequest).toHaveBeenCalled()
    })
  })

  describe('delete', () => {
    it('delete with not allowed method', async () => {
      const apiService = new BaseApiSerivce('', [API_METHODS.CREATE])

      expect(() => apiService.delete(1)).toThrowError(SERVICE_METHOD_ERRORS.DELETE)
    })

    it('delete with allowed memthod', async () => {
      const apiService = new BaseApiSerivce('', [API_METHODS.DELETE])

      await apiService.delete(1)

      expect(spyMakeRequest).toHaveBeenCalled()
    })
  })

  describe('update', () => {
    it('update with not allowed method', async () => {
      const apiService = new BaseApiSerivce('', [API_METHODS.CREATE])

      expect(() => apiService.update(1, {})).toThrowError(SERVICE_METHOD_ERRORS.UPDATE)
    })

    it('update with allowed methodd', async () => {
      const apiService = new BaseApiSerivce('', [API_METHODS.UPDATE, API_METHODS.PARTIAL_UPDATE])

      await apiService.update(1, {})

      expect(spyMakeRequest).toHaveBeenCalled()
    })
  })

  describe('create', () => {
    it('create without allowed method', async () => {
      const apiService = new BaseApiSerivce('', [API_METHODS.DELETE])

      expect(() => apiService.create({})).toThrowError(SERVICE_METHOD_ERRORS.CREATE)
    })

    it('create with allowed method', async () => {
      const apiService = new BaseApiSerivce('', [API_METHODS.CREATE])

      await apiService.create({})

      expect(spyMakeRequest).toHaveBeenCalled()
    })
  })
})