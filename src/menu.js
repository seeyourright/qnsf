const menu = [
  {
    title: '系统管理',
    icon: 'icon-xitong',
    path: '1',
    permission: 'system',
    children: [
      {
        title: 'App管理',
        icon: '',
        path: '/home/app',
        permission: 'app'
      },
      {
        title: '角色管理',
        icon: '',
        path: '/home/role',
        permission: 'role'
      },
      {
        title: '管理员列表',
        icon: '',
        path: '/home/administrator',
        permission: 'admin'
      },
      {
        title: '用户管理',
        icon: '',
        path: '/home/user',
        permission: 'user'
      },
      {
        title: '权限管理',
        icon: '',
        path: '/home/permission',
        permission: ''
      },
      {
        title: '单位管理',
        icon: '',
        path: '/home/unit',
        permission: 'unit'
      },
      {
        title: '房间管理',
        icon: '',
        path: '/home/room',
        permission: 'room'
      }
    ]
  },
  {
    title: '公共服务',
    icon: 'icon-fuwu',
    path: '2',
    permission: 'public_service',
    userType: ["1","4","5","6"],
    children: [
      {
        title: '人民调解',
        icon: '',
        path: '/home/adjust',
        permission: 'adjust',
        userType: ["1"]
      },
      {
        title: '法律援助',
        icon: '',
        path: '/home/lawHelp',
        permission: 'lawHelp'
      },
      {
        title: '司法所',
        icon: '',
        path: '/home/judicial',
        permission: 'judicial'
      },
      {
        title: '法治学堂',
        icon: '',
        path: '/home/school',
        permission: 'school'
      },
      {
        title: '律师服务',
        icon: '',
        path: '/home/lawyerServices',
        permission: 'lawyerServices',
        userType: ["4"]
      },
      {
        title: '公证服务',
        icon: '',
        path: '/home/notaryServices',
        permission: 'notaryServices',
        userType: ["5"]
      },
      {
        title: '司法鉴定',
        icon: '',
        path: '/home/AppraisalOffice',
        permission: 'AppraisalOffice',
        userType: ["6"]
      }
    ]
  },
  {
    title: '内容管理',
    icon: 'icon-xitong',
    path: '3',
    permission: 'content',
    children: [
      {
        title: 'Banner管理',
        icon: '',
        path: '/home/banner',
        permission: 'banner'
      },
      {
        title: '系统推送',
        icon: '',
        path: '/home/push',
        permission: 'push'
      },
      {
        title: '法治政府',
        icon: '',
        path: '/home/government',
        permission: 'government'
      },
      {
        title: '法治宣传',
        icon: '',
        path: '/home/propaganda',
        permission: 'propaganda'
      },
      {
        title: '普法问卷',
        icon: '',
        path: '/home/questionnaire',
        permission: 'questionnaire'
      }
    ]
  },
  {
    title: '政府服务',
    icon: 'icon-xitong',
    path: '4',
    permission: 'government_service',
    children: [
      {
        title: '行政执法',
        icon: '',
        path: '/home/ale',
        permission: 'ale'
      },
      {
        title: '行政复议',
        icon: '',
        path: '/home/ar',
        permission: 'ar'
      },
      {
        title: '群众来信',
        icon: '',
        path: '/home/massesLetter',
        permission: 'massesLetter'
      }
    ]
  },
]

export default menu
