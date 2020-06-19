import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '1',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../page/Login')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../page/Home'),
      redirect: '/home/welcome',
      children: [
        {
          path: 'welcome',
          name: 'welcome',
          component: () => import('../page/Welcome')
        },
        {
          path: 'app',
          name: 'app',
          component: () => import('../page/system/App')
        },
        {
          path: 'role',
          name: 'role',
          component: () => import('../page/system/Role')
        },
        {
          path: 'administrator',
          name: 'administrator',
          component: () => import('../page/system/Administrator')
        },
        {
          path: 'user',
          name: 'user',
          component: () => import('../page/system/User')
        }
      ]
    },
    {
      path: '/*',
      name: '404',
      component: () => import('../page/404')
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})
router.afterEach((to, from) => {

})
export default router
