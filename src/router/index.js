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
          component: () => import('../page/system/app/App')
        },
        {
          path: 'role',
          name: 'role',
          component: () => import('../page/system/role/Role')
        },
        {
          path: 'roleAdd',
          name: 'roleAdd',
          component: () => import('../page/system/role/RoleAdd')
        },
        {
          path: 'administrator',
          name: 'administrator',
          component: () => import('../page/system/administrator/Administrator')
        },
        {
          path: 'administratorAdd',
          name: 'administratorAdd',
          component: () => import('../page/system/administrator/AdministratorAdd')
        },
        {
          path: 'administratorEdit',
          name: 'administratorEdit',
          component: () => import('../page/system/administrator/AdministratorAdd')
        },
        {
          path: 'user',
          name: 'user',
          component: () => import('../page/system/user/User')
        },
        {
          path: 'userEdit',
          name: 'userEdit',
          component: () => import('../page/system/user/UserEdit')
        },
        // ---------------------------ly------------------------------------
        {
          path: 'adjust',
          name: 'adjust',
          component: () => import('../page/publicService/adjust/adjust')
        },
        {
          path: 'adjustDetail',
          name: 'adjustDetail',
          component: () => import('../page/publicService/adjust/adjustDetail')
        },
        {
          path: 'lawHelp',
          name: 'lawHelp',
          component: () => import('../page/publicService/lawHelp/lawHelp')
        },
        {
          path: 'lawConsult',
          name: 'lawConsult',
          component: () => import('../page/publicService/lawConsult/lawConsult')
        },
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
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
