import LayoutPractice from "@/layouts/LayoutApp.vue";
import { shallowMount, type VueWrapper } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe('LayoutApp.vue', () => {
  let wrapper: VueWrapper<any>

  function createComponent() {
    wrapper = shallowMount(LayoutPractice)
  }
  it('rendered', () => {
    createComponent()

    expect(wrapper.exists()).toBe(true)
  })
})