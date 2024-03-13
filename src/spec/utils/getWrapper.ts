import { mount } from "@vue/test-utils";
import ElementPlus from 'element-plus';

const globalConfig = {
  plugins: [ElementPlus]
}

export function getWrapper<T, U>(component: U): T {
  return mount(component, {
    global: {
      ...globalConfig,
      stubs: ['RouterLink']
    },
  }) as T
}

