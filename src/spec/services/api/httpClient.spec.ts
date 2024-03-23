import makeRequest from "@/services/api/httpClient";
import type { BaseResponse } from "@/types/api";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

interface User {
  id: number
  name: string
}

describe('httpClient', () => {
  let mockAxios: MockAdapter

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
  })

  afterEach(() => {
    mockAxios.reset()
  })

  it('called with params', async () => {
    const users = [
      { id: 1, name: 'test' }
    ]
    mockAxios.onGet(`${import.meta.env.VITE_APP_API_URL}/users`).reply(200, users)

    const response = await makeRequest<BaseResponse<User>>({
      url: '/users',
      method: 'GET'
    })

    expect(response.data).toEqual(users)
  })

  it('called with params and env prod', async () => {
    const users = [
      { id: 1, name: 'test' }
    ]
    mockAxios.onGet(`${import.meta.env.VITE_APP_API_URL}/users`).reply(200, users)

    const response = await makeRequest<BaseResponse<User>>({
      url: '/users',
      method: 'GET'
    })

    expect(response.data).toEqual(users)
  })
})