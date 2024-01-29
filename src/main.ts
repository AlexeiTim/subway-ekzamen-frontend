import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVfm } from 'vue-final-modal'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'vue-final-modal/style.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const vfm = createVfm()

app.use(vfm)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
