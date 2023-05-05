import store from '@/store'
/**
 * 将路由的title转换
 */
import i18n from '@/i18n'
import { watch } from 'vue'

export function generateTitle(title: string): string {
  return i18n.global.t('msg.route.' + title) // 通过i18n的global属性访问全局翻译
}

/**
 *
 * @param  {...((lang: string) => void)} cbs 所有的回调,作用于tags
 */
export function watchSwitchLang(...cbs: ((lang: string) => void)[]) {
  watch(
    () => store.getters.language,
    (newLang: string) => {
      cbs.forEach((cb) => cb(newLang))
    }
  )
}
