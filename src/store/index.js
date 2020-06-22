import Vuex from 'vuex'
import vue from 'vue'

vue.use(Vuex)
const isIE = !!(window.ActiveXObject || 'ActiveXObject' in window)
const userInfo = localStorage.getItem('userInfo')
const config = {
  state: {
    isIE: isIE,
    userInfo: userInfo ? JSON.parse(userInfo) : {}
  }
}

export default new Vuex.Store(config)
