import Vuex from 'vuex'
import vue from 'vue'

vue.use(Vuex)

const userInfo = localStorage.getItem('userInfo')
const config = {
  state: {
    userInfo: userInfo ? JSON.stringify(userInfo) : {}
  }
}

export default new Vuex.Store(config)
