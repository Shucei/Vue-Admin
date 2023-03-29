import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import global from './global'
import '@/styles/dark.scss'
import 'normalize.css'
import '@/styles/index.scss'
// i18n （PS：导入放到 APP.vue 导入之前，因为后面我们会在 app.vue 中使用国际化内容）
import i18n from '@/i18n/index'
const app = createApp(App)
app.use(global)
app.use(store)
app.use(i18n)
app.use(router)
app.mount('#app')
