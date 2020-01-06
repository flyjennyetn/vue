import Layout from '../layout';

const Example = [
  {
    path: '/tables',
    name: 'tables',
    title: '表格管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'basic',
        name: 'basic',
        title: '基本表格',
        component: () => require('./tables/basic')
      },
      {
        path: 'sort',
        name: 'sort',
        title: '排序表格',
        component: () => require('./tables/sort')
      },
      {
        path: 'filter',
        name: 'filter',
        title: '筛选表格',
        component: () => require('./tables/filter')
      }
    ]
  },
  {
    path: '/form',
    name: 'form',
    title: '表单管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'render',
        name: 'render',
        title: '渲染表单',
        component: () => require('./form/render/render')
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    title: '用户管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'user_index',
        title: '用户管理',
        component: () => require('./user/index')
      }
    ]
  }
];


export default Example;