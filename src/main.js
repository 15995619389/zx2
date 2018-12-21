// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import $ from "jquery";
import "./style/public.css";
import axios from "axios";
import "babel-polyfill";
// import '../src/script/http'
import VueWechatTitle from "vue-wechat-title";
import htmlToPdf from "../src/script/htmpToPdf";
import Distpicker from "v-distpicker";
import config from "./appsettings";

Vue.component("v-distpicker", Distpicker);
Vue.config.productionTip = false;
Vue.use(VueWechatTitle);
Vue.use(htmlToPdf);


// 请求绑定在vue上面，以便使用
 const instance = axios.create({
  baseURL: config.Api_Url,
});

// 添加一个响应拦截器
instance.interceptors.request.use(function (config) {
  let token = localStorage.getItem('token')
  if(token){
    config.headers.Authorization = "Bearer " + token
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  console.log(error)
  if(error.response){
    switch(error.response.status){
      case 401:
        localStorage.removeItem('token')
        router.replace({
          path:'/login',
          query: {redirect: router.currentRoute.fullPath}
        })
    }
  }
  return Promise.reject(error);
});


Vue.prototype.$http = instance;


router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) { // 判断该路由是否需要登录权限
    if(localStorage.getItem('token')){ //判断本地是否存在access_token
      next();
    }else {
      var returnUrl = encodeURIComponent(to.fullPath);
      next({
        path:'/login'+"?returnUrl="+returnUrl
      })
    }
  }
  else {
    next();
  }
  /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
  if(to.fullPath == "/login"){
    if(localStorage.getItem('token')){
      next({
        path:from.fullPath
      });
    }else {
      next();
    }
  }
});



/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  $,
  components: { App },
  template: "<App/>"
});
