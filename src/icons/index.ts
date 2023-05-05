import { App } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
const requireAll = (requireContext: any) =>
  requireContext.keys().map(requireContext) // 通过正则匹配引入相应的文件
const req = require.context('../icons/svg', false, /\.svg$/) // 找到icons目录下以.svg结尾的文件
requireAll(req)
export default (app: App) => app.component('svg-icon', SvgIcon)
