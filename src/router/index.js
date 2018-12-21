import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/views/Home/home'
// import AboutUs from '@/views/AboutUs/aboutUs'
// import Problem from '@/views/AboutUs/children/problem'
// import ContactUs from '@/views/AboutUs/children/contactUs'
// import AboutUsIndex from '@/views/AboutUs/children/index'
// 企服帮
// import Companie from '@/views/Companie/index'
// import CompanieDetail from '@/views/Companie/detail'
// search
// import SearchIndex from '@/views/Search/index'
// import SearchDetail from '@/views/Search/detail'
// login
// import Login from '@/views/Login/login'
// import Register from '@/views/Login/register'
// import RegisterSuccess from '@/views/Login/registerSuccess'
// 会员中心
// import myIndex from '@/views/My/index'
// import myInfo from '@/views/My/children/info'
// import myCollect from '@/views/My/children/collect'
// import myAmendInfo from '@/views/My/children/amend'
// import myOrder from '@/views/My/children/order'
// import memberIndex from '@/views/My/children/index'
// import myAppraisa from '@/views/My/children/appraisa'
// import appraisaDetail from '@/views/My/children/detail'
// 测评
// import EvaluationIndex from '@/views/Evaluation/index'
// import EvaluationDetail from '@/views/Evaluation/detail'
// import EvaluationInfo from '@/views/Evaluation/info'

//测评申报
// import DeclareIndex from '@/views/Declare/index'
// import HintIndex from '@/views/Declare/hint'

//立即申报
// import BookingIndex from '@/views/Booking/index'

// 找回密码
// import FindPassword_Step1 from '@/views/Passport/FindPassword_Step1' 
// import FindPassword_Step2 from '@/views/Passport/FindPassword_Step2' 
// import ModifyPwd from '@/views/Passport/ModifyPwd' 
// import FindPassword_Step3 from '@/views/Passport/FindPassword_Step3' 
// import ModifySuccess from '@/views/Passport/ModifySuccess' 
// import { resolve } from 'path';

// 路由按需加载
Vue.use(Router)

export default new Router({
  mode:'history',
  linkActiveClass:'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: resolve => require(['../views/Home/home.vue'],resolve),
      meta:{
        title:'首页'
      }
    },
    // 关于我们
    {
      path: '/aboutUs',
      // name: 'AboutUs',
      component: resolve => require(['../views/AboutUs/aboutUs.vue'],resolve),
      meta:{
        title:'关于我们'
      },
      children:[
        {
          path:'/',
          redirect:'index'
        },
        {
          path:'index',
          name:"AboutUsIndex",
          component:resolve=>require(['../views/AboutUs/children/index.vue'],resolve),
          meta:{
            title:'公司简介'
          }
        },
        {
          path:'problem',
          name:"Problem",
          component:resolve=>require(['../views/AboutUs/children/problem.vue'],resolve),
          meta:{
            title:'常见问题'
          }
        },
        {
          path:'contactUs',
          name:"ContactUs",
          component:resolve=>require(['../views/AboutUs/children/contactUs.vue'],resolve),
          meta:{
            title:'联系我们'
          }
        }
        
      ]
    },
    // 企服帮
    {
      path:'/companie',
      name:"Companie",
      component:resolve=>require(['../views/Companie/index.vue'],resolve),
      meta:{
        title:'企服帮'
      }
    },
    {
      path:'/companie/detail/:id',
      name:'CompanieDetail',
      component:resolve=>require(['../views/Companie/detail.vue'],resolve),
      meta:{
        title:'企服详情'
      }
    },
    // 搜索index
    {
      path:'/search',
      name:'SearchIndex',
      component:resolve=>require(['../views/Search/index.vue'],resolve),
      meta:{
        title:'政策搜'
      }
    },
    {
      path:"/policydetail/:id",
      name:"SearchDetail",
      component:resolve=>require(['../views/Search/detail.vue'],resolve),
      meta:{
        title:'政策详情'
      }
    },
    // 登录
    {
      path:'/login',
      name:'Login',
      component:resolve=>require(['../views/Login/login.vue'],resolve),
      meta:{
        title:'登录'
      },
      beforeEnter:(to,from,next)=>{
        if(!to.query.returnUrl){
          to.query.returnUrl = from.fullPath;
        }
        next()
      }
    },
    // 注册
    {
      path:'/register',
      name:'Register',
      component:resolve=>require(['../views/Login/register.vue'],resolve),
      meta:{
        title:'注册'
      }
    },
    {
      path:'/registerSuccess',
      name:'RegisterSuccess',
      component:resolve=>require(['../views/Login/registerSuccess.vue'],resolve),
      meta:{
        title:'注册成功'
      }
    },
    // 找回密码
    {
      path:'/PassPort/FindPassword_Step1',
      name:'FindPassword_Step1',
      component:resolve=>require(['../views/Passport/FindPassword_Step1.vue'],resolve),
      meta:{
        title:'找回密码'
      },
    },
    {
      path:'/PassPort/FindPassword_Step2',
      name:'FindPassword_Step2',
      component:resolve=>require(['../views/Passport/FindPassword_Step2.vue'],resolve),
      meta:{
        title:'找回密码'
      },
    },
    {
      path:'/PassPort/ModifyPwd',
      name:'ModifyPwd',
      component:resolve=>require(['../views/Passport/ModifyPwd.vue'],resolve),
      meta:{
        title:'找回密码'
      },
    },
    {
      path:'/PassPort/FindPassword_Step3',
      name:'FindPassword_Step3',
      component:resolve=>require(['../views/Passport/FindPassword_Step3.vue'],resolve),
      meta:{
        title:'找回密码'
      },
    },
    {
      path:'/PassPort/ModifySuccess',
      name:'ModifySuccess',
      component:resolve=>require(['../views/Passport/ModifySuccess.vue'],resolve),
      meta:{
        title:'密码修改成功'
      },
    },
    // 会员中心
    {
      path:'/my',
      // name:"myIndex",
      component:resolve=>require(['../views/My/index.vue'],resolve),
      meta:{
        requiresAuth: true
      },
      children:[
        {
          path:'/',
          component:resolve=>require(['../views/My/children/index.vue'],resolve),
          meta:{
            title:'会员中心',
            requiresAuth: true
          },
        },
        {
          path:'info',
          component:resolve=>require(['../views/My/children/info.vue'],resolve),
          meta:{
            title:'基本信息',
            requiresAuth: true
          }
        },
        {
          path:'amendInfo',
          name:'myAmendInfo',
          component:resolve=>require(['../views/My/children/amend.vue'],resolve),
          meta:{
            title:'修改基本信息',
            requiresAuth: true
          }
        },
        {
          path:'updatePwd',
          name:'updatePwd',
          component:resolve=>require(['../views/My/children/updatePwd.vue'],resolve),
          meta:{
            title:'修改密码',
            requiresAuth: true
          }
        },
        {
          path:'collect',
          component:resolve=>require(['../views/My/children/collect.vue'],resolve),
          meta:{
            title:'我的收藏',
            requiresAuth: true
          }
        },
        {
          path:'order',
          component:resolve=>require(['../views/My/children/order.vue'],resolve),
          meta:{
            title:'申报管理',
            requiresAuth: true
          }
        },
        {
          path:'appraisa',
          component:resolve=>require(['../views/My/children/appraisa.vue'],resolve),
          meta:{
            title:'测评管理',
            requiresAuth: true
          }
        },
        {
          path:'appraisa/detail/:id',
          component:resolve=>require(['../views/My/children/detail.vue'],resolve),
          meta:{
            title:'测评报告详情',
            requiresAuth: true
          }
        }
      ]
    },
    // 测评流程
    {
      path:'/evaluation',
      component:resolve=>require(['../views/Evaluation/index.vue'],resolve),
      meta:{
        title:'测评信息',
        // requiresAuth: true
      },
    },
    {
      path:'/evaluation/info',
      component:resolve=>require(['../views/Evaluation/info.vue'],resolve),
      meta:{
        title:'测评人信息'
      },
    },
    {
      // 测评信息流程完之后的测评结果
      path:'/evaluation/detail',
      component:resolve=>require(['../views/Evaluation/detail.vue'],resolve),
      meta:{
        title:'测评结果',
        requiresAuth: true
      }
    },
    {
      path:'/declare',
      component:resolve=>require(['../views/Declare/index.vue'],resolve),
      meta:{
        title:'测评结果--立即申报',
        requiresAuth: true
      }
    },
    {
      path:'/hint',
      component:resolve=>require(['../views/Declare/hint.vue'],resolve),
      meta:{
        title:'测评结果--申报已提交',
        requiresAuth: true
      }
    },
    // 立即申报
    {
      path:'/booking',
      component:resolve=>require(['../views/Booking/index.vue'],resolve),
      meta:{
        title:'立即申报',
        requiresAuth: true
      }
    },

  ]
})

