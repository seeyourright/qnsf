import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../page/Login')
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})
router.afterEach((to, from) => {

})
export default router
