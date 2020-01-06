import Vue from 'vue';
import VueRouter from 'vue-router';
import { Loading } from 'element-ui';
import { setTitle } from 'utils';

import Login from './login/login';
import Home from './home/home';
import Errors from './error/index';
import Layout from './layout';

import Example from './Example/route';

Vue.use(VueRouter);

const router = new VueRouter({
  	mode: 'history',
  	routes: [
	  {
	    path: '/login',
	    name: 'login',
	    meta: {
	      title: 'Login - 登录'
	    },
	    component:Login
	  },
	  {
	    path: '/',
	    name: 'otherRouter',
	    redirect: '/home',
	    meta: {
	      requireAuth: true
	    },
	    component: Layout,
	    children: [
	      {
	        path: 'home',
	        name: 'home',
	        title: '首页',
	        component: Home
	      }
	    ]
	  },
	  ...Example,
	  {
	    path: '/error/:code',
	    name: 'error',
	    meta: {
	      title: 'error'
	    },
	    component:Errors
	  },
	]
});

let loading;
router.beforeEach((to, form, next) => {
  loading = Loading.service({
    // fullscreen: true,
    target: '.content-wrapper',
    text: '跳转中...'
  });
  
  // 设置window.document.title 的名称
  setTitle(to.meta.title);
  
  if (!to.matched.length) {
    next({
      path: '/error/404',
      replace: true
    });
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  // 解决某些情况下loading无法关闭的情况
  setTimeout(() => {
    loading.close();
  }, 0)
});

export default router;