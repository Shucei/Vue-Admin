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

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

hyRequest
  .request<DataType>({
    url: '/home/multidata',
    method: 'GET',
    showLoading: true
  })
  .then((res) => {
    console.log(res)
  })
