import ButtonLogout from '@/components/Buttons/ButtonLogout.vue'
import { ROUTER_NAMES } from '@/constants/router'
import { createTestingPinia } from '@pinia/testing'
import { mount, type VueWrapper } from '@vue/test-utils'
import ElementPlus, { ElButton } from 'element-plus'
import { describe, expect, it, vi, type Mock } from 'vitest'
import { useRouter } from 'vue-router'

vi.mock('vue-router')
const mockRouterPushFn = vi.fn()

describe('ButttonGoBack.vue', () => {
  let wrapper: VueWrapper<any>

  function createComponent() {
    wrapper = mount(ButtonLogout, {
      global: {
        plugins: [ElementPlus, createTestingPinia()]
      }
    })
  }

  it('rendered', () => {
    createComponent()

    expect(wrapper.exists()).toBe(true)
  })

  it('button text is Выйти', async () => {
    createComponent()

    const buttonText = wrapper.findComponent(ElButton).text()

    expect(buttonText).toBe('Выйти')
  })

  it('init logout after click', async () => {
    (useRouter as Mock).mockReturnValue({
      push: mockRouterPushFn
    })

    createComponent()

    await wrapper.findComponent(ElButton).trigger('click')

    expect(mockRouterPushFn).toHaveBeenCalledWith({
      name: ROUTER_NAMES.LOGIN
    })
  })
})
