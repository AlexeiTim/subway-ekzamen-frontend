import AppHeader from '@/components/Common/AppHeader.vue'
import { createTestingPinia } from '@pinia/testing'
import { shallowMount, type VueWrapper } from "@vue/test-utils"
import ElementPlus from 'element-plus'
import { describe, expect, it, vi } from "vitest"

vi.mock('vue-router')

describe('ButttonGoBack.vue', () => {
  let wrapper: VueWrapper<any>

  function createComponent() {
    wrapper = shallowMount(AppHeader, {
      global: {
        plugins: [ElementPlus, createTestingPinia()],
      }
    })
  }

  it('rendered', () => {
    createComponent()

    expect(wrapper.exists()).toBe(true)
  })
})