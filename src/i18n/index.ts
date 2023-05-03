import { createI18n } from 'vue-i18n'

import mZhLocale from './lang/zh'
import mEnLocale from './lang/en'
import LocalCache from '@/utils/storage'
import store from '@/store'
/**
 * 返回当前 lang
 */
function getLanguage() {
  return LocalCache.getItem('lang') || store.getters.language || 'zh'
}
const messages = {
  en: {
    msg: {
      ...mEnLocale
    }
  },
  zh: {
    msg: {
      ...mZhLocale
    }
  }
}
const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式，则需要将其设置为false
  globalInjection: true, // 全局注入 $t 函数
  locale: getLanguage(),
  messages
})

export default i18n
