import AboutPage from "@/pages/AboutPage.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe('AboutPage.vue', () => {
  let wrapper: ReturnType<typeof mount>

  function createComponent() {
    wrapper = mount(AboutPage)  
  }

  it('rendered', () => {
    createComponent()

    expect(wrapper.exists()).toBe(true)
  })
})