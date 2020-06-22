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
          component: () => import('../page/system/role/RoleAdd'),
          meta: {
            ppath: '/home/role'
          }
        },
        {
          path: 'administrator',
          name: 'administrator',
          component: () => import('../page/system/administrator/Administrator')
        },
        {
          path: 'administratorAdd',
          name: 'administratorAdd',
          component: () => import('../page/system/administrator/AdministratorAdd'),
          meta: {
            ppath: '/home/administrator'
          }
        },
        {
          path: 'administratorEdit',
          name: 'administratorEdit',
          component: () => import('../page/system/administrator/AdministratorAdd'),
          meta: {
            ppath: '/home/administrator'
          }
        },
        {
          path: 'user',
          name: 'user',
          component: () => import('../page/system/user/User')
        },
        {
          path: 'userEdit',
          name: 'userEdit',
          component: () => import('../page/system/user/UserEdit'),
          meta: {
            ppath: '/home/user'
          }
        },
        {
          path: 'banner',
          name: 'banner',
          component: () => import('../page/content/banner/Banner')
        },
        {
          path: 'bannerAdd',
          name: 'bannerAdd',
          component: () => import('../page/content/banner/BannerAdd'),
          meta: {
            ppath: '/home/banner'
          }
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
          path: 'helpDetail',
          name: 'helpDetail',
          component: () => import('../page/publicService/lawHelp/helpDetail')
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
  if (to.fullPath === '/login' || to.fullPath === '/404' || localStorage.getItem('token')) {
    next()
  } else {
    next('/login')
  }
})
router.afterEach((to, from) => {

})
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
