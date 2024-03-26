import { useRegistration } from "@/composables/useRegistration";
import { REGISTRATION_MESSAGES } from "@/constants/auth";
import { ERRORS } from "@/constants/errors";
import { ROUTER_NAMES } from "@/constants/router";
import { AuthService } from "@/services/api/rest/auth";
import { NotificationService } from "@/services/notify/notification";
import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { defineComponent } from "vue";

const spyNotify = vi.spyOn(NotificationService.prototype, 'error')
const spyNotifySuccess = vi.spyOn(NotificationService.prototype, 'success')
const spyRegistration = vi.spyOn(AuthService.prototype, 'registration')
const mockRouterPush = vi.fn();

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockRouterPush
  })
}))


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
    const TestComponent = defineComponent({
      setup() {
        return {
          ...useRegistration()
        }
      }
    })
    spyRegistration.mockImplementation(() => Promise.resolve<any>({
      data: {
        username: '1',
        email: '1',
        id: 1
      }
    }))
    const wrapper = mount(TestComponent)


    await wrapper.vm.registration(registrationWithData)
    await flushPromises()

    const name = ROUTER_NAMES.LOGIN
    expect(mockRouterPush).toHaveBeenCalledWith({
      name,
    })
    expect(spyNotifySuccess).toHaveBeenCalledWith(REGISTRATION_MESSAGES.SUCCESS)
  })
})