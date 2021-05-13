import Vue from 'vue'
import Router from 'vue-router'


import Index from '@/views/index'
import Login from '@/views/login'
import Foregt from '@/views/forget'
import EditPass from '@/views/editPass'

import Layout from '@/views/layout'
import Home from '@/views/home'
import ManageStaff from '@/views/manage/user/staff'
import ManageCustom from '@/views/manage/user/custom'

import Aa from '@/views/aa'
import ManageOpcompany from '@/views/manage/user/opcompany'
import ManageOpteam from '@/views/manage/user/opteam'
import ManageAdvertise from '@/views/manage/advertisement/advertise'





Vue.use(Router)

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/dashboard',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/forget',
      name: 'Foregt',
      component: Foregt
    },
    {
      path: '/editPass',
      name: 'EditPass',
      component: EditPass,
    },

    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children:[
        {
          path: 'home',
          name: 'Home',
          component: Home,
          meta:{
            path:'/home'
          }
        },
        {
          path: 'staff',
          name: 'ManageStaff',
          component: ManageStaff,
          meta:{
            path:'/custom'
          }
        },
        {
          path: 'custom',
          name: 'ManageCustom',
          component: ManageCustom,
          meta:{
            path:'/custom'
          }
        },
        {
          path: 'aa',
          name: 'Aa',
          component: Aa,
          meta:{
            path:'/custom'
          }
        },
        {
          path: 'opcompany',
          name: 'ManageOpcompany',
          component: ManageOpcompany,
          meta:{
            path:'/custom'
          }
        },
        {
          path: 'opteam',
          name: 'ManageOpteam',
          component: ManageOpteam,
          meta:{
            path:'/custom'
          }
        },
        {
          path: 'advertise',
          name: 'ManageAdvertise',
          component: ManageAdvertise,
          meta:{
            path:'/custom'
          }
        }
      ]
    },
   
  ]
})
