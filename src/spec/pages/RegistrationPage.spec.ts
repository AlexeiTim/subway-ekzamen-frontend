import { useRegistration } from '@/composables/useRegistration';
import type { AuthData } from '@/types/auth';
import { VueWrapper, flushPromises, mount } from '@vue/test-utils';
import ElementPlus from 'element-plus';
import { describe, expect, it, vi, type Mock } from 'vitest';
import RegistrationPage from '../../pages/RegistrationPage.vue';

vi.mock('@/composables/useRegistration')
vi.mock('vue-router')

interface ComponentData {
  registrationData: AuthData,
  registration: Function,
  handleRegistration: Promise<void>,
  checkValidForm: boolean
}
type ComponentWrapper = VueWrapper<ComponentData>;

describe('Registration Page', async () => {
  let wrapper: ComponentWrapper

  function createComponent(options = {}, stubs = []) {
    wrapper = mount(RegistrationPage, {
      ...options,
      global: {
        plugins: [ElementPlus],
        stubs: ['RouterLink', ...stubs],
      },
    }) as ComponentWrapper
  }

  function findElementByTestId(testId: string)  {
    return wrapper.find(`[data-testid='${testId}']`)
  }

  it('is valid form data' , async () => {
    (useRegistration as Mock).mockReturnValue({
      registration: vi.fn()
    })

    createComponent()

    const usernameInput = findElementByTestId('username-input')
    await usernameInput.setValue('1')

    const passwordInput = findElementByTestId('password-input')
    await passwordInput.setValue('1')

    const submitButton = await findElementByTestId('submit-button')
    await submitButton.trigger('click')
    await flushPromises()

    expect(useRegistration().registration).toHaveBeenCalledWith({
      username: '1',
      password: '1',
    })
  })

  it('is not valid form data' , async () => {
    (useRegistration as Mock).mockReturnValue({
      registration: vi.fn()
    })

    createComponent()

    const submitButton = await findElementByTestId('submit-button')
    await submitButton.trigger('click')

    expect(useRegistration().registration).not.toHaveBeenCalled()
  })

  it('registration form title', () => {
    createComponent()

    expect(wrapper.html()).toContain('Регистрация')
  })

  it('registration handler text', async () => {
    const submitButtonText = 'Зарегестрироваться'
    createComponent()

    expect(wrapper.text()).toContain(submitButtonText)
  })

  it('change username', async () => {
    createComponent()

    const usernameInput = findElementByTestId('username-input')
    await usernameInput.setValue('username')

    expect(wrapper.vm.registrationData.username).toEqual('username')
  })

  it('change password', async () => {
    createComponent()

    const passwordInput = findElementByTestId('password-input')
    await passwordInput.setValue('password')

    expect(wrapper.vm.registrationData.password).toEqual('password')
  })

  it('checkValidForm with undefined argument', async () => {
    createComponent()
    
    const result = await wrapper.vm.checkValidForm(undefined)

    expect(result).toEqual(undefined)
  })
})
