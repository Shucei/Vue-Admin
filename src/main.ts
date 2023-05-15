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
import lazyPlugin from '@/directive/index' // 图片懒加载
// i18n （PS：导入放到 APP.vue 导入之前，因为后面我们会在 app.vue 中使用国际化内容）
import i18n from '@/i18n/index'
import installElementPlus from '@/plugins/elememt'

// websocket
// import WebSocketService from './plugins/ws-socket'
// const socketService = new WebSocketService('ws://localhost:3000')
// socketService.connect()

const app = createApp(App)
// app.config.globalProperties.$socketService = socketService
app.use(global)
app.use(store)
app.use(i18n)
app.use(router)
app.use(SvgIcon)
app.use(lazyPlugin)
app.use(installElementPlus)
app.mount('#app')
