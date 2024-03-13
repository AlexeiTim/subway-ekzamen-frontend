import { useLogin } from "@/composables/useLogin";
import LoginPage from "@/pages/LoginPage.vue";
import type { AuthData } from "@/types/auth";
import { mount, type VueWrapper } from "@vue/test-utils";
import ElementPlus, { type FormInstance, type FormRules } from 'element-plus';
import { describe, expect, it, vi, type Mock } from "vitest";

vi.mock('vue-router')
vi.mock('@/composables/useLogin')

interface ComponentSetup {
  formRef: FormInstance,
  formRules: FormRules,
  login: () => Promise<void>,
  loginData: AuthData,
  checkValidForm: () => boolean,
  handleLogin: () => Promise<void>,
  useLogin: () => {
    login: () => Promise<void>
  },
}

type Wrapper = VueWrapper<ComponentSetup>

describe('LoginPage', () => {
  let wrapper: Wrapper

  function createComponent(options = {}, stubs = []) {
    wrapper = mount(LoginPage, {
      ...options,
      global: {
        plugins: [ElementPlus],
        stubs: ['RouterLink', 'ElInput', ...stubs],
      },
    }) as Wrapper
  }

  it('rendered', () => {
    (useLogin as Mock).mockReturnValue({
      login: vi.fn()
    })
    createComponent()

    expect(wrapper.exists()).toBe(true)
  })
})