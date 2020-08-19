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
        // 系统管理
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
          path: 'unit',
          name: 'unit',
          component: () => import('../page/system/unit/Unit')
        },
        {
          path: 'unitEdit',
          name: 'unitEdit',
          component: () => import('../page/system/unit/UnitEdit'),
          meta: {
            ppath: '/home/unit'
          }
        },
        {
          path: 'unitRoom',
          name: 'unitRoom',
          component: () => import('../page/system/unit/Room'),
          meta: {
            ppath: '/home/unit'
          }
        },
        {
          path: 'room',
          name: 'room',
          component: () => import('../page/system/room/Room')
        },
        {
          path: 'roomEdit',
          name: 'roomEdit',
          component: () => import('../page/system/room/RoomEdit'),
          meta: {
            ppath: '/home/room '
          }
        },
        {
          path: 'permission',
          name: 'permission',
          component: () => import('../page/system/permission/Permission')
        },
        // 内容管理
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
        {
          path: 'push',
          name: 'push',
          component: () => import('../page/content/push/Push')
        },
        {
          path: 'pushAdd',
          name: 'pushAdd',
          component: () => import('../page/content/push/PushAdd'),
          meta: {
            ppath: '/home/push'
          }
        },
        {
          path: 'government',
          name: 'government',
          component: () => import('../page/content/government/Government'),
          redirect: 'government/information',
          children: [
            {
              path: 'information',
              name: 'information',
              component: () => import('../page/content/government/Information'),
              meta: {
                ppath: '/home/government'
              }
            },
            {
              path: 'evaluation',
              name: 'evaluation',
              component: () => import('../page/content/government/Evaluation'),
              meta: {
                ppath: '/home/government'
              }
            }
          ]
        },
        {
          path: 'government/informationAdd',
          name: 'informationAdd',
          component: () => import('../page/content/government/InformationAdd'),
          meta: {
            ppath: '/home/government'
          }
        },
        {
          path: 'evaluationAdd',
          name: 'evaluationAdd',
          component: () => import('../page/content/government/EvaluationAdd'),
          meta: {
            ppath: '/home/government'
          }
        },
        {
          path: 'evaluationDetail',
          name: 'evaluationDetail',
          component: () => import('../page/content/government/EvaluationDetail'),
          redirect: 'evaluationDetail/evaluationBase',
          meta: {
            ppath: '/home/government'
          },
          children: [
            {
              path: 'evaluationBase',
              name: 'evaluationBase',
              component: () => import('../page/content/government/EvaluationBase'),
              meta: {
                ppath: '/home/government'
              }
            },
            {
              path: 'evaluationStatistics',
              name: 'evaluationStatistics',
              component: () => import('../page/content/government/EvaluationStatistics'),
              meta: {
                ppath: '/home/government'
              }
            },
          ]
        },
        {
          path: 'propaganda',
          name: 'propaganda',
          component: () => import('../page/content/propaganda/Propaganda')
        },
        {
          path: 'propagandaAdd',
          name: 'PropagandaAdd',
          component: () => import('../page/content/propaganda/PropagandaAdd'),
          meta: {
            ppath: '/home/propaganda'
          }
        },
        {
          path: 'questionnaire',
          name: 'questionnaire',
          component: () => import('../page/content/questionnaire/Questionnaire')
        },
        {
          path: 'questionnaireAdd',
          name: 'questionnaireAdd',
          component: () => import('../page/content/questionnaire/QuestionnaireAdd'),
          meta: {
            ppath: '/home/questionnaire'
          }
        },
        {
          path: 'questionnaireDetail',
          name: 'questionnaireDetail',
          component: () => import('../page/content/questionnaire/QuestionnaireDetail'),
          redirect: 'questionnaireDetail/questionnaireBase',
          meta: {
            ppath: '/home/questionnaire'
          },
          children: [
            {
              path: 'questionnaireBase',
              name: 'questionnaireBase',
              component: () => import('../page/content/questionnaire/QuestionnaireBase'),
              meta: {
                ppath: '/home/questionnaire'
              }
            },
            {
              path: 'questionnaireStatistics',
              name: 'questionnaireStatistics',
              component: () => import('../page/content/questionnaire/QuestionnaireStatistics'),
              meta: {
                ppath: '/home/questionnaire'
              }
            }
          ]
        },
        // 政府服务
        {
          path: 'ale',
          name: 'ale',
          component: () => import('../page/governmentService/administrativeLawEnforcement/Ale'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'aleAdd',
          name: 'aleAdd',
          component: () => import('../page/governmentService/administrativeLawEnforcement/AleAdd')
        },
        {
          path: 'leo',
          name: 'leo',
          component: () => import('../page/governmentService/administrativeLawEnforcement/Leo')
        },
        {
          path: 'leoAdd',
          name: 'leoAdd',
          component: () => import('../page/governmentService/administrativeLawEnforcement/LeoAdd')
        },
        {
          path: 'ar',
          name: 'ar',
          component: () => import('../page/governmentService/administrativeReconsideration/Ar')
        },
        {
          path: 'arAdd',
          name: 'arAdd',
          component: () => import('../page/governmentService/administrativeReconsideration/ArAdd')
        },
        {
          path: 'massesLetter',
          name: 'massesLetter',
          component: () => import('../page/governmentService/massesLetter/Ml')
        },
        {
          path: 'mlDetail',
          name: 'mlDetail',
          component: () => import('../page/governmentService/massesLetter/MlDetail')
        },
        // 公共服务
        {
          path: 'judicial',
          name: 'judicial',
          component: () => import('../page/publicService/judicial/judicial')
        },
        {
          path: 'school',
          name: 'school',
          component: () => import('../page/publicService/school/School'),
          redirect: 'school/live',
          children: [
            {
              path: 'live',
              name: 'live',
              component: () => import('../page/publicService/school/Live'),
              meta: {
                ppath: '/home/school'
              }
            },
            {
              path: 'lived',
              name: 'lived',
              component: () => import('../page/publicService/school/Lived'),
              meta: {
                ppath: '/home/school'
              }
            }
          ]
        },
        {
          path: 'school/liveAdd',
          name: 'liveAdd',
          component: () => import('../page/publicService/school/LiveAdd'),
          meta: {
            ppath: '/home/school'
          }
        },
        {
          path: 'school/livedAdd',
          name: 'liveAdd',
          component: () => import('../page/publicService/school/LivedAdd'),
          meta: {
            ppath: '/home/school'
          }
        },
        {
          path: 'lawyerServices',
          name: 'lawyerServices',
          component: () => import('../page/publicService/lawyerServices/LawyerServices'),
        },
        {
          path: 'lawyerServicesAdd',
          name: 'lawyerServicesAdd',
          component: () => import('../page/publicService/lawyerServices/LawyerServicesAdd'),
          meta: {
            ppath: '/home/lawyerServices'
          }
        },
        {
          path: 'lsDetail',
          name: 'lsDetail',
          component: () => import('../page/publicService/lawyerServices/LSDetail'),
          meta: {
            ppath: '/home/lawyerServices'
          },
          children: [
            {
              path: 'lsBase',
              name: 'lsBase',
              component: () => import('../page/publicService/lawyerServices/LSBase'),
              meta: {
                ppath: '/home/lawyerServices'
              }
            },
            {
              path: 'lsLawyer',
              name: 'lsLawyer',
              component: () => import('../page/publicService/lawyerServices/LSLawyer'),
              meta: {
                ppath: '/home/lawyerServices'
              }
            },
            {
              path: 'lsLawyerAdd',
              name: 'lsLawyerAdd',
              component: () => import('../page/publicService/lawyerServices/LSLawyerAdd'),
              meta: {
                ppath: '/home/lawyerServices'
              }
            },
            {
              path: 'lsOrder',
              name: 'lsOrder',
              component: () => import('../page/publicService/lawyerServices/LSOrder'),
              meta: {
                ppath: '/home/lawyerServices'
              }
            },
            {
              path: 'lsOrderAdd',
              name: 'lsOrderAdd',
              component: () => import('../page/publicService/lawyerServices/LSOrderAdd'),
              meta: {
                ppath: '/home/lawyerServices'
              }
            },
            {
              path: 'lsBlacklist',
              name: 'lsBlacklist',
              component: () => import('../page/publicService/lawyerServices/LSBlacklist'),
              meta: {
                ppath: '/home/lawyerServices'
              }
            }
          ]
        },
        // 司法鉴定
        {
          path: 'appraisalOffice',
          name: 'appraisalOffice',
          component: () => import('../page/publicService/judicialAppraisal/AppraisalOffice'),
        },
        {
          path: 'appraisalOfficeAdd',
          name: 'appraisalOfficeAdd',
          component: () => import('../page/publicService/judicialAppraisal/AppraisalOfficeAdd'),
          meta: {
            ppath: '/home/appraisalOffice'
          }
        },
        {
          path: 'jaDetail',
          name: 'jaDetail',
          component: () => import('../page/publicService/judicialAppraisal/JADetail'),
          meta: {
            ppath: '/home/appraisalOffice'
          },
          children: [
            {
              path: 'jaBase',
              name: 'jaBase',
              component: () => import('../page/publicService/judicialAppraisal/JABase'),
              meta: {
                ppath: '/home/appraisalOffice'
              }
            },
            {
              path: 'jaOrder',
              name: 'jaOrder',
              component: () => import('../page/publicService/judicialAppraisal/JAOrder'),
              meta: {
                ppath: '/home/appraisalOffice'
              }
            },
            {
              path: 'jaOrderApproval',
              name: 'jaOrderApproval',
              component: () => import('../page/publicService/judicialAppraisal/JAOrderApproval'),
              meta: {
                ppath: '/home/appraisalOffice'
              }
            },
            {
              path: 'jaPersonnel',
              name: 'jaPersonnel',
              component: () => import('../page/publicService/judicialAppraisal/JAPersonnel'),
              meta: {
                ppath: '/home/appraisalOffice'
              }
            }
          ]
        },
        // 公证服务
        {
          path: 'notaryServices',
          name: 'notaryServices',
          component: () => import('../page/publicService/notaryServices/NotaryServices'),
        },
        {
          path: 'notaryServicesAdd',
          name: 'notaryServicesAdd',
          component: () => import('../page/publicService/notaryServices/NotaryServicesAdd'),
          meta: {
            ppath: '/home/notaryServices'
          }
        },
        {
          path: 'nsDetail',
          name: 'nsDetail',
          component: () => import('../page/publicService/notaryServices/NSDetail'),
          meta: {
            ppath: '/home/notaryServices'
          },
          children:[
            {
              path: 'nsBase',
              name: 'nsBase',
              component: () => import('../page/publicService/notaryServices/NSBase'),
              meta: {
                ppath: '/home/notaryServices'
              }
            },
            {
              path: 'nsOrder',
              name: 'nsOrder',
              component: () => import('../page/publicService/notaryServices/NSOrder'),
              meta: {
                ppath: '/home/notaryServices'
              }
            },
            {
              path: 'nsOrderApproval',
              name: 'nsOrderApproval',
              component: () => import('../page/publicService/notaryServices/NSOrderApproval'),
              meta: {
                ppath: '/home/notaryServices'
              }
            }
          ]
        },
        // ---------------------------ly------------------------------------
        {
          path: 'adjust',
          name: 'adjust',
          component: () => import('../page/publicService/adjust/adjust')
        },
        {
          path: 'adjustAdd',
          name: 'adjustAdd',
          component: () => import('../page/publicService/adjust/adjustAdd')
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
          path: 'lawHelpAdd',
          name: 'lawHelpAdd',
          component: () => import('../page/publicService/lawHelp/lawAdd')
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
        {
          path: '*',
          name: 'in404',
          component: () => import('../page/404')
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
