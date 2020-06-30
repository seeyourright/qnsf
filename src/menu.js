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
        permission: ''
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
      }
      // {
      //   title: '房间管理',
      //   icon: '',
      //   path: '/home/room',
      //   permission: ''
      // }
    ]
  },
  {
    title: '公共服务',
    icon: 'icon-fuwu',
    path: '2',
    permission: '',
    children: [
      {
        title: '人民调解',
        icon: '',
        path: '/home/adjust',
        permission: ''
      },
      {
        title: '法律援助',
        icon: '',
        path: '/home/lawHelp',
        permission: ''
      },
      {
        title: '法律咨询',
        icon: '',
        path: '/home/lawConsult',
        permission: ''
      }
    ]
  },
  {
    title: '内容管理',
    icon: 'icon-xitong',
    path: '3',
    permission: '',
    children: [
      {
        title: 'Banner管理',
        icon: '',
        path: '/home/banner',
        permission: ''
      },
      {
        title: '系统推送',
        icon: '',
        path: '/home/push',
        permission: ''
      },
      {
        title: '法制政府',
        icon: '',
        path: '/home/government',
        permission: ''
      },
      {
        title: '法制宣传',
        icon: '',
        path: '/home/propaganda',
        permission: ''
      }
    ]
  },
]

export default menu
