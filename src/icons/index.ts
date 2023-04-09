import { App } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
const requireAll = (requireContext: any) =>
  requireContext.keys().map(requireContext)
const req = require.context('../icons/svg', false, /\.svg$/)
requireAll(req)
export default (app: App) => app.component('svg-icon', SvgIcon)
