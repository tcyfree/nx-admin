import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";

Vue.use(ElementUI);
Vue.prototype.$axios = axios;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');

// request拦截器,通过request拦截器在每个请求头里面塞入token
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            // 这里将token设置到headers中，header的key是Authorization，这个key值根据你的需要进行修改即可
            config.headers['token'] = token;
        }
        return config
    },
    error => {
        console.log(error) // for debug
        Promise.reject(error)
    });

// respone拦截器
// axios.interceptors.response.use(
//     response => response,
//     /**
//      * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
//      * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
//      */
//         //  const res = response.data;
//         //     if (res.code !== 20000) {
//         //       Message({
//         //         message: res.message,
//         //         type: 'error',
//         //         duration: 5 * 1000
//         //       });
//         //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
//         //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//         //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
//         //           confirmButtonText: '重新登录',
//         //           cancelButtonText: '取消',
//         //           type: 'warning'
//         //         }).then(() => {
//         //           store.dispatch('FedLogOut').then(() => {
//         //             location.reload();// 为了重新实例化vue-router对象 避免bug
//         //           });
//         //         })
//         //       }
//         //       return Promise.reject('error');
//         //     } else {
//         //       return response.data;
//         //     }
//     error => {
//         console.log('err' + error)// for debug
//         Message({
//             message: error.message,
//             type: 'error',
//             duration: 5 * 1000
//         })
//         return Promise.reject(error)
//     });
