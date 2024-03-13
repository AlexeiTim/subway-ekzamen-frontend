import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createVfm } from 'vue-final-modal'

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import 'vue-final-modal/style.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const vfm = createVfm()

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(vfm)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
