// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import $ from 'jquery'
import router from './router/index'
import axios from 'axios'
import store from './vuex/store'
import Vuex from 'vuex'

Vue.use(Vuex)
// Vue.use(echarts)

Vue.config.productionTip = false
Vue.prototype.$axios = axios;

// 全局导航钩子
router.beforeEach((to, from, next) => {
//   console.log(to.meta.requireAuth)
  if (to.meta.requireAuth) {
    if (!isEmptyObject(sessionStorage.getItem("isLogin"))) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
})


function isEmptyObject(obj) {
  for (var key in obj) {
    return false;
  }
  return true;
}
//判断object是否为空

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})
