import { useLogin } from "@/composables/useLogin";
import LoginPage from "@/pages/LoginPage.vue";
import { mount, type VueWrapper } from "@vue/test-utils";
import ElementPlus from 'element-plus';
import { describe, it, vi, type Mock } from "vitest";

vi.mock('vue-router')
vi.mock('@/composables/useLogin')

// interface ComponentSetup {
//   formRef: FormInstance,
//   formRules: FormRules,
//   login: () => Promise<void>,
//   loginData: AuthData,
//   checkValidForm: () => boolean,
//   handleLogin: () => Promise<void>,
//   useLogin: () => {
//     loginData: AuthData,
//     login: () => Promise<void>
//   },
// }

// type Wrapper = VueWrapper<ComponentSetup>

describe('LoginPage', () => {
  let wrapper: VueWrapper

  function createComponent(options = {}, stubs = []) {
    wrapper = mount(LoginPage, {
      ...options,
      global: {
        plugins: [ElementPlus],
        stubs: ['RouterLink', 'ElInput', ...stubs],
      },
    })
  }

  it('rendered', () => {
    (useLogin as Mock).mockReturnValue({
      login: vi.fn()
    })
    createComponent()

    // expect(wrapper.exists()).toBe(true)
  })
})