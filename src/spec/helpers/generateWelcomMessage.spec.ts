import { generateWelcomeMessage } from "@/helpers/generateWelcomeMessage";
import { describe, expect, it } from "vitest";

describe('generateWelcomeMessage', () => {
  it('with empty username', () => {
    const result = generateWelcomeMessage('')

    expect(result).toEqual('Добро пожаловать!')
  })

  it('with username', () => {
    const result = generateWelcomeMessage('Test')

    expect(result).toEqual('Добро пожаловать, Test!')
  })
})