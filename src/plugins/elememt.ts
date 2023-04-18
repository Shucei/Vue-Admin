import { App } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import store from '@/store/index'
import ElementPlus from 'element-plus'
/**
 *组件国际化
 */
export default (app: App) => {
  app.use(ElementPlus, {
    locale: store.getters.language === 'en' ? en : zhCn
  })
}
