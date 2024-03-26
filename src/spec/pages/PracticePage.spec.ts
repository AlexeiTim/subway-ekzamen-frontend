import PracticePage from "@/pages/PracticePage.vue"
import { VueWrapper, mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"

describe('PracticePage.vue', () => {
  let wrapper: VueWrapper<any>

  function createComponent() {
    wrapper = mount(PracticePage)
  }

  it('rendered', () => {
    createComponent()

    expect(wrapper.exists()).toBe(true)
  })
})