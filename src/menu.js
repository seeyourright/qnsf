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
    children: [
      {
        title: '人民调解',
        icon: '',
        path: '/home/adjust',
        permission: 'adjust'
      },
      {
        title: '法律援助',
        icon: '',
        path: '/home/lawHelp',
        permission: 'lawHelp'
      },
      // {
      //   title: '法律咨询',
      //   icon: '',
      //   path: '/home/lawConsult',
      //   permission: 'lawConsult'
      // },
      // {
      //   title: '司法所',
      //   icon: '',
      //   path: '/home/judicial',
      //   permission: 'judicial'
      // },
      {
        title: '法制学堂',
        icon: '',
        path: '/home/school',
        permission: ''
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
        title: '法制政府',
        icon: '',
        path: '/home/government',
        permission: 'government'
      },
      {
        title: '法制宣传',
        icon: '',
        path: '/home/propaganda',
        permission: 'propaganda'
      }
    ]
  },
  {
    title: '政府服务',
    icon: 'icon-xitong',
    path: '3',
    //permission: 'government_service',
    permission: '',
    children: [
      {
        title: '行政执法',
        icon: '',
        path: '/home/ale',
        permission: ''
      }
    ]
  },
]

export default menu
