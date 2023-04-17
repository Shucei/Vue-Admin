import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/permission' // 全局守卫
import global from './global' // 全局
import '@/styles/dark.scss' // 暗黑
import 'normalize.css' // 重置样式
import '@/styles/index.scss' // 自定义样式
import SvgIcon from '@/icons/index' //svg
// i18n （PS：导入放到 APP.vue 导入之前，因为后面我们会在 app.vue 中使用国际化内容）
import i18n from '@/i18n/index'
const app = createApp(App)
app.use(global)
app.use(store)
app.use(i18n)
app.use(router)
app.use(SvgIcon)
app.mount('#app')


