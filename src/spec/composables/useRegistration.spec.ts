import { useRegistration } from "@/composables/useRegistration";
import { REGISTRATION_MESSAGES } from "@/constants/auth";
import { ERRORS } from "@/constants/errors";
import { ROUTER_NAMES } from "@/constants/router";
import { AuthService } from "@/services/api/rest/auth";
import { NotificationService } from "@/services/notify/notification";
import { flushPromises } from "@vue/test-utils";
import { describe, expect, it, vi, type Mock } from "vitest";
import { withSetup } from "../utils/withSetup";

const spyNotify = vi.spyOn(NotificationService.prototype, 'error')
const spyNotifySuccess = vi.spyOn(NotificationService.prototype, 'success')
const spyRegistration = vi.spyOn(AuthService.prototype, 'registration')
vi.mock('vue-router')


describe('useRegistration', () => {
  const registrationEmptyData = {
    username: '',
    password: ''
  }
  const registrationWithData = {
    username: '1',
    password: '1',
  }

  it('catch registartion', async () => {
    const { registration } = useRegistration()
    spyRegistration.mockImplementation(() => Promise.reject())

    await registration(registrationEmptyData)

    expect(spyNotify).toHaveBeenCalledWith(ERRORS.CANT_CREATE_USER)
  })
  it('try with false response data', async () => {
    const { registration } = useRegistration()
    spyRegistration.mockImplementation(() => Promise.resolve<any>({
      data: undefined
    }))

    await registration(registrationWithData)

    expect(spyNotify).toHaveBeenCalledWith(ERRORS.CANT_CREATE_USER)
  })

  it('try with true response data', async () => {
    spyRegistration.mockImplementation(() => Promise.resolve<any>({
      data: {
        username: '1',
        email: '1',
        id: 1
      }
    }))
    const VueRouter = await import('vue-router');
    const mockRouterPush = vi.fn();

    (VueRouter.useRouter as Mock).mockReturnValue({
      push: mockRouterPush
    })

    const [result, app] = withSetup(useRegistration)
    await (result as any).registration(registrationWithData)
    await flushPromises()

    const name = ROUTER_NAMES.LOGIN
    expect(mockRouterPush).toHaveBeenCalledWith({
      name,
    })
    expect(spyNotifySuccess).toHaveBeenCalledWith(REGISTRATION_MESSAGES.SUCCESS)
    app?.unmount()
  })
})