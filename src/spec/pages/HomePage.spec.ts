import HomePage from "@/pages/HomePage.vue";
import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe('HomePage.vue', () => {
  let wrapper: ReturnType<typeof shallowMount>

  function createComponent() {
    wrapper = shallowMount(HomePage)  
  }

  it('rendered', () => {
    createComponent()

    expect(wrapper.exists()).toBe(true)
  })
})