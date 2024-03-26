import LayoutDashboard from "@/layouts/LayoutDashboard.vue";
import { shallowMount, type VueWrapper } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe('LayoutApp.vue', () => {
  let wrapper: VueWrapper<any>

  function createComponent() {
    wrapper = shallowMount(LayoutDashboard)
  }
  it('rendered', () => {
    createComponent()

    expect(wrapper.exists()).toBe(true)
  })
})