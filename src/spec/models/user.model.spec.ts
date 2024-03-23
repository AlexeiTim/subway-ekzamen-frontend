import { UserModel } from "@/models"
import { describe, expect, it } from "vitest"

describe('user.model', () => {
  it('created', () => {
    const data = {
      id: 1,
      username: 'username',
      email: '@'
    }

    const userModel = new UserModel(data)

    expect(JSON.stringify(userModel)).toEqual(JSON.stringify(data))
  })
})