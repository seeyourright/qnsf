import Vuex from 'vuex'
import vue from 'vue'

vue.use(Vuex)
const isIE = !!(window.ActiveXObject || 'ActiveXObject' in window)
const userInfo = localStorage.getItem('userInfo')
const permission = localStorage.getItem('permission')
const user = localStorage.getItem('user')
const config = {
  state: {
    isIE: isIE,
    ws: null,
    userInfo: userInfo ? JSON.parse(userInfo) : {},
    permission: permission ? JSON.parse(permission) : [],
    user: user ? JSON.parse(user) : {}
  }
}

export default new Vuex.Store(config)
