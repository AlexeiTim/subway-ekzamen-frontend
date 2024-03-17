import ExamThemesPage from "@/pages/ExamThemesPage.vue";
import router from "@/router";
import { createTestingPinia } from '@pinia/testing';
import { mount } from "@vue/test-utils";
import ElementPlus from 'element-plus';
import { describe, expect, it } from "vitest";

describe('ExamThemes.vue', () => {
  let wrapper: ReturnType<typeof mount>

  function createComponent() {
    wrapper = mount(ExamThemesPage, {
      global: {
        plugins: [ElementPlus, createTestingPinia(), router],
      },
    })  
  }

  it('rendered', () => {
    createComponent()

    expect(wrapper.exists()).toBe(true)
  })
})