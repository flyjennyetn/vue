import Vue from 'vue';
import ElementUI from 'element-ui';
import store from './store/index';
import router from './pages/route';
import App from './pages/App';

import 'assets/scss/base.scss';
import 'assets/scss/main.scss';
// 引入公共样式表
// import 'normalize.css';
// import 'animate.css';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// 发布后是否显示提示
Vue.config.productionTip = false
// 只有开发时才开启工具
Vue.config.devtools = process.env.NODE_ENV === 'development'

const app = new Vue({
  store,
  router,
  render: (h)=> h(App)
}).$mount("#app");

