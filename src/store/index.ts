import { createStore } from 'vuex'
import getters from './getters'
import user from './modules/user.js'
import app from './modules/app.js'
import theme from './modules/theme'
export default createStore({
  getters: getters,
  modules: {
    user,
    app,
    theme
  }
})
