import * as notify from "@/services/notify/notification"
import { describe, expect, it, vi } from "vitest"

const testMessage = 'test message'
const mockSuccess = vi.fn()
const mockError = vi.fn()
const mockWarning = vi.fn()

vi.spyOn(notify, 'NotificationService').mockReturnValue({
  duration: 2000,
  success: (message) => {
    mockSuccess(message)
  },
  error: (message) => {
    mockError(message)
  },
  warning: (message) => {
    mockWarning(message)
  }
})

describe('notification service', () => {
  it('notify success', () => {
    const notifyService = new notify.NotificationService()

    notifyService.error(testMessage)

    expect(mockError).toHaveBeenCalledWith(testMessage)
  })

  it('notify success', () => {
    const notifyService = new notify.NotificationService()

    notifyService.success(testMessage)

    expect(mockSuccess).toHaveBeenCalledWith(testMessage)
  })

  it('notify warning', () => {
    const notifyService = new notify.NotificationService()

    notifyService.warning(testMessage)

    expect(mockWarning).toHaveBeenCalledWith(testMessage)
  })
})