import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import global from './global'
import hyRequest from './utils/request'
const app = createApp(App)
app.use(global)
app.use(store)
app.use(router)
app.mount('#app')
hyRequest.request({
  url: '/home/multidata',
  method: 'GET',
  showLoading: false
})
