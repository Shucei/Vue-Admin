import { App } from 'vue'

export default {
  install(app: App) {
    defineDirective(app)
  }
}

// 定义指令(图片错误的时候显示默认图片)
const defineDirective = (app: App) => {
  app.directive('lazy', {
    mounted(el: any, binding: any, vnode: any) {
      el.onerror = function () {
        el.src = 'https://i.gtimg.cn/club/item/face/img/2/16022_100.gif'
      }
      el.src = binding.value
    }
  })
}
