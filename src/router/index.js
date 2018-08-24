import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Industry from '@/components/industry/industry'
import Overall from '@/components/industry/overall'
import sub_industry from '@/components/industry/sub_industry'
import sub_industry_son from '@/components/industry/sub_industry_son'
import Login from '@/components/login'
import Store from '@/components/store/store'
import StoreTop from '@/components/industry/StoreTop'
import Seller_provinces from '@/components/industry/Seller_provinces'
import Seller_credit from '@/components/industry/Seller_credit'
import BabyTop from '@/components/industry/BabyTop'
import babylist from '@/components/store/baby_list'
import babyhot from '@/components/store/baby_hot'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/industry',
      component: Industry,

      children: [{
          path: '/overall',
          meta: {
            requireAuth: true // 这里设置，当前路由需要校验
          },
          component: Overall
        },
        {
          path: '/sub_industry',
          component: sub_industry,
          meta: {
            requireAuth: true // 这里设置，当前路由需要校验
          }
        }, {
          path: '/sub_industry_son',
          component: sub_industry_son,
          meta: {
            requireAuth: true // 这里设置，当前路由需要校验
          }
        }, {
          path: '/StoreTop',
          component: StoreTop,
          meta: {
            requireAuth: true
          }
        }, {
          path: '/Seller_provinces',
          component: Seller_provinces,
          meta: {
            requireAuth: true
          }
        }, {
          path: '/Seller_credit',
          component: Seller_credit,
          meta: {
            requireAuth: true
          }
        }, {
          path: '/BabyTop',
          component: BabyTop,
          meta: {
            requireAuth: true
          }
        }
      ],
      redirect: '/overall'
    }, {
      path: '/store',
      component: Store,
      children: [{
        path: '/baby_list',
        component: babylist,
        meta: {
          requireAuth: true
        }
      },{
        path: '/babyhot',
        component: babyhot,
        meta: {
          requireAuth: true
        }
      }]
    },
  ]
})
