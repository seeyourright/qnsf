import Vuex from 'vuex'
import vue from 'vue'

vue.use(Vuex)
const isIE = !!(window.ActiveXObject || 'ActiveXObject' in window)
const userInfo = localStorage.getItem('userInfo')
const permission = localStorage.getItem('permission')
const config = {
  state: {
    isIE: isIE,
    userInfo: userInfo ? JSON.parse(userInfo) : {},
    permission: permission ? JSON.parse(permission) : []
  }
}

export default new Vuex.Store(config)
