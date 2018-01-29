// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App.vue'
// import Customers from './components/Customers'
// import Login from './components/Login'
// import Report from './components/Report'
// import CommunityList from './components/CommunityList'
// import UserList from './components/UserList'
// import Page from './components/Pagination'
// import TestDemo from './components/TestDemo'
// import About from './components/About'
// import Add from './components/Add'
// import CustomerDetails from './components/CustomerDetails'
// import Edit from './components/Edit'
import routerConfig from './config/router.config.js'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueResource)

// 设置路由
// const router = new VueRouter({
//   mode:"history",
//   base:__dirname,
//   routes:[
//     {path:"/report",component:Report},
//     {path:"/community_list",component:CommunityList},
//     {path:"/",component:Login},
//     {path:"/user_list",component:UserList},
//     {path:"/page",component:Page},
//     {path:"/customer",component:Customers},
//     {path:"/test_demo",component:TestDemo},
//     {path:"/about",component:About},
//     {path:"/add",component:Add},
//     {path:"/customer/:id",component:CustomerDetails},
//     {path:"/edit/:id",component:Edit},
//   ]
// })
// const router = new VueResource(routerConfig)
const router=new VueRouter(routerConfig);

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

