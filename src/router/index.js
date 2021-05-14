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
import ManageOpcompany from '@/views/manage/user/opcompany'
import ManageOpteam from '@/views/manage/user/opteam'

import ArchivesBuild from '@/views/manage/archives/build'
import ArchivesDevice from '@/views/manage/archives/device'
import ArchivesEnergy from '@/views/manage/archives/energy'
import ArchivesMeter from '@/views/manage/archives/meter'
import ArchivesPrice from '@/views/manage/archives/price'
import ArchivesRule from '@/views/manage/archives/rule'

import ManageAdvertise from '@/views/manage/advertisement/advertise'
import ManageData from '@/views/manage/advertisement/data'
import ManageLog from '@/views/manage/advertisement/log'

import ManageInfo from '@/views/manage/info'

import Aa from '@/views/aa'



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
          path: 'build',
          name: 'ArchivesBuild',
          component: ArchivesBuild,
          meta:{
            path:'/custom'
          }
        },
        {
          path: 'device',
          name: 'ArchivesDevice',
          component: ArchivesDevice,
          meta:{
            path:'/custom'
          }
        },
        {
          path: 'meter',
          name: 'ArchivesMeter',
          component: ArchivesMeter,
          meta:{
            path:'/custom'
          }
        },
        {
          path: 'rule',
          name: 'ArchivesRule',
          component: ArchivesRule,
          meta:{
            path:'/custom'
          }
        },
        {
          path: 'energy',
          name: 'ArchivesEnergy',
          component: ArchivesEnergy,
          meta:{
            path:'/custom'
          }
        },
        {
          path: 'price',
          name: 'ArchivesPrice',
          component: ArchivesPrice,
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
        },
        {
          path: 'data',
          name: 'ManageData',
          component: ManageData,
          meta:{
            path:'/custom'
          }
        },
        {
          path: 'log',
          name: 'ManageLog',
          component: ManageLog,
          meta:{
            path:'/custom'
          }
        },
        {
          path: 'info',
          name: 'ManageInfo',
          component: ManageInfo,
          meta:{
            path:'/custom'
          }
        }
      ]
    },
   
  ]
})
