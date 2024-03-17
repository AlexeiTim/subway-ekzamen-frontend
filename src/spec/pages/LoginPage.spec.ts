import { useLogin } from "@/composables/useLogin";
import LoginPage from "@/pages/LoginPage.vue";
import { VueWrapper, flushPromises, mount } from "@vue/test-utils";
import ElementPlus, { ElButton, ElInput } from 'element-plus';
import { describe, expect, it, vi, type Mock } from "vitest";

vi.mock('vue-router')
vi.mock('@/composables/useLogin')
const mockedLogin = vi.fn() as () => void

(useLogin as Mock).mockReturnValue({
  login: mockedLogin
})

describe('LoginPage', () => {
  let wrapper: VueWrapper<any>

  function findElementByTestId(name: string) {
    return wrapper.find(`[data-testid="${name}"]`)
  }

  function createComponent({ options = {}, stubs = {}, mocks = {} } = {}) {
    wrapper = mount(LoginPage, {
      ...options,
      global: {
        plugins: [ElementPlus],
        stubs: {
          teleport: true,
          'RouterLink': {
            template: '<div></div>',
          },
          ...stubs
        },
        mocks: {
          ...mocks
        }
      },
    })
  }

  it('rendered', () => {
    createComponent({

    })

    expect(wrapper.exists()).toBe(true)
  })

  // it('return if formRef is not have', async () => {
  //   createComponent()

  //   const result = await wrapper.vm.checkValidForm?.(null)

  //   expect(result).toEqual(undefined)
  // })

  describe('validation form', () => {
    let usernameContainer
    let passwordContainer
    let inputs
    let submitButton
    let usernameInput
    let passwordInput

    it('login with empty login data', async () => {
      createComponent()
      usernameContainer = findElementByTestId('username-form-item')
      passwordContainer = findElementByTestId('password-form-item')
      inputs = wrapper.findAllComponents(ElInput)
      submitButton = wrapper.findComponent(ElButton)
      usernameInput = inputs[0]
      passwordInput = inputs[1]

      await submitButton.trigger('click')
      await flushPromises()

      expect(usernameContainer.classes()).contain('is-error')
      expect(passwordContainer.classes()).contain('is-error')
      expect(mockedLogin).not.toHaveBeenCalled()
    })

    it('login with empty username field and empty password field', async () => {
      createComponent()
      usernameContainer = findElementByTestId('username-form-item')
      passwordContainer = findElementByTestId('password-form-item')
      inputs = wrapper.findAllComponents(ElInput)
      submitButton = wrapper.findComponent(ElButton)
      usernameInput = inputs[0]
      passwordInput = inputs[1]
      usernameInput.setValue('1')
      await submitButton.trigger('click')
      await flushPromises()

      expect(usernameContainer.classes()).not.contain('is-error')
      expect(passwordContainer.classes()).contain('is-error')
      expect(mockedLogin).not.toHaveBeenCalled()
    })

    it('login with  username field and  password field', async () => {
      createComponent()
      usernameContainer = findElementByTestId('username-form-item')
      passwordContainer = findElementByTestId('password-form-item')
      inputs = wrapper.findAllComponents(ElInput)
      submitButton = wrapper.findComponent(ElButton)
      usernameInput = inputs[0]
      passwordInput = inputs[1]

      usernameInput.setValue('1')
      passwordInput.setValue('1')
      await submitButton.trigger('click')
      await flushPromises()

      expect(usernameContainer.classes()).not.contain('is-error')
      expect(passwordContainer.classes()).not.contain('is-error')
      expect(mockedLogin).toHaveBeenCalled()
    })
  })

  it('test handleLogin witout args', async () => {
    createComponent()

    const result = await wrapper.vm.handleLogin(undefined)

    expect(result).toEqual(undefined)
  })



})