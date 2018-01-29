// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App.vue'
import routerConfig from './config/router.config.js'
import axios from 'axios'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueResource)

// 设置路由，创建路由实例
const router=new VueRouter(routerConfig);

// Vue.prototype.$http=axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  linkActiveClass:'active', //更新活动链接的class类名
  router,
})
  // .$mount("#app")

// 使用拦截器可以在在请求前对Header进行添加

Vue.http.interceptors.push((request, next) => {
  var token = localStorage.getItem("token")
  request.headers.set('token', token); //setting request.headers
  next((response) => {
      if (response.status === 400 || response.status === 401) {
      // 当 Token 已经失效时，清空所有保存在 localStorage 的数据
      localStorage.clear();
    }
    return response
  })
})

// Vue.http.interceptors.push({
//   request(request) {
//     const jwtToken = localStorage.getItem('AdminToken');
//     if (jwtToken) {
//       Vue.http.headers.common.Authorization = `${jwtToken.access_token}`;
//     } else {
//       delete Vue.http.headers.common.Authorization;
//     }
//     return request;
//   },
//   response(response) {
//     if (response.status === 400 || response.status === 401) {
//       // 当 Token 已经失效时，清空所有保存在 localStorage 的数据
//       localStorage.clear();
//     }
//     return response;
//   },
// });

