import ButtonGoBack from '@/components/Buttons/ButtonGoBack.vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import ElementPlus, { ElButton } from 'element-plus'
import { describe, expect, it, vi, type Mock } from 'vitest'
import { useRouter } from 'vue-router'

vi.mock('vue-router')
const mockRouterGoBackFn = vi.fn()

describe('ButttonGoBack.vue', () => {
  let wrapper: VueWrapper<any>

  function createComponent() {
    wrapper = mount(ButtonGoBack, {
      global: {
        plugins: [ElementPlus],
        mocks: {
          $router: {
            go: mockRouterGoBackFn()
          }
        }
      }
    })
  }

  it('rendered', () => {
    createComponent()

    expect(wrapper.exists()).toBe(true)
  })

  it('button has text Назад', async () => {
    createComponent()

    const buttonText = wrapper.findComponent(ElButton).text()

    expect(buttonText).toBe('Назад')
  })

  it('go to back after click', async () => {
    (useRouter as Mock).mockReturnValue({
      go: mockRouterGoBackFn
    })

    createComponent()

    await wrapper.findComponent(ElButton).trigger('click')

    expect(mockRouterGoBackFn).toHaveBeenCalled()
  })
})
