const menu = [
  {
    title: '页面内容管理',
    icon: 'icon-xitong',
    path: '1',
    permission: '',
    children: [
      {
        title: 'App管理',
        icon: '',
        path: '/home/app',
        permission: ''
      },
      {
        title: '角色管理',
        icon: '',
        path: '/home/role',
        permission: ''
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
        permission: ''
      }
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
      },
    ]
  }
]

export default menu
