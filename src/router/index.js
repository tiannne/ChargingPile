import { createRouter, createWebHistory } from 'vue-router'


const Login = () => import('../views/Login.vue')
const Index = () => import('../views/Index.vue')
const Jiaoyiguanli = () => import('../views/Jiaoyiguanli.vue')
const Tongjifenxi = () => import('../views/Tongjifenxi.vue')
const Zhandianguanli = () => import('../views/Zhandianguanli.vue')
const Chongdianzhuang = () => import('../views/Zhandianguanli/Chongdianzhuang.vue')
const Chongdzhandian = () => import('../views/Zhandianguanli/Chongdzhandian.vue')
const Chongzhijilu = () => import('../views/Jiaoyiguanli/Chongzhijilu.vue')
const Jiaoyiliushui = () => import('../views/Jiaoyiguanli/Jiaoyiliushui.vue')
const Nenghaofenxi = () => import('../views/Tongjifenxi/Nenghaofenxi.vue')
const Yunyingqingk = () => import('../views/Tongjifenxi/Yunyingqingk.vue')
const Home = () => import('../views/Home.vue')



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index,
      redirect:'/home',
      meta:{
        breadcrumb:[
          '首页'
        ]
      },
      children:[
        {
          path: '/home',
          name: 'home',
          component: Home,
          meta:{
            breadcrumb:[
              '首页'
            ]
          }
        },
        {
          path: '/jiaoyiguanli',
          name: 'jiaoyiguanli',
          component: Jiaoyiguanli,
          meta:{
            breadcrumb:[
              '首页','交易管理'
            ]
          }
        },
        {
          path: '/jiaoyiguanli',
          name: 'jiaoyiguanli',
          component: Jiaoyiguanli,
          children: [
            {
              path: 'chongzhijilu',
              name: 'chongzhijilu',
              component: Chongzhijilu,
              meta:{
                breadcrumb:[
                  '首页','充值记录'
                ]
              }
            },
            {
              path: 'jiaoyiliushui',
              name: 'jiaoyiliushui',
              component: Jiaoyiliushui,
              meta:{
                breadcrumb:[
                  '首页','交易流水'
                ]
              }
            }
          ]
        },
        {
          path: '/tongjifenxi',
          name: 'tongjifenxi',
          component: Tongjifenxi,
          meta:{
            breadcrumb:[
              '首页','统计分析'
            ]
          },
          children: [
            {
              path: 'nenghaofenxi',
              name: 'nenghaofenxi',
              component: Nenghaofenxi,
              meta:{
                breadcrumb:[
                  '首页','能耗分析'
                ]
              }
            },
            {
              path: 'yunyingqingk',
              name: 'yunyingqingk',
              component: Yunyingqingk,
              meta:{
                breadcrumb:[
                  '首页','运营情况'
                ]
              }
            }
          ] 
        },
        {
          path: '/zhandianguanli',
          name: 'zhandianguanli',
          component: Zhandianguanli,
          meta:{
            breadcrumb:[
              '首页','站点管理'
            ]
          },
          children: [
            {
              path: 'chongdianzhuang',
              name: 'chongdianzhuang',
              component: Chongdianzhuang,
              meta:{
                breadcrumb:[
                  '首页','充电桩'
                ]
              }
            },
            {
              path: 'chongdzhandian',
              name: 'chongdzhandian',
              component: Chongdzhandian,
              meta:{
                breadcrumb:[
                  '首页','充电站点'
                ]
              }
            }
          ]
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    }
  ]
})

export default router
