import Vue from 'vue'
import Router from 'vue-router'


import Index from '@/views/index'
import Login from '@/views/login'






Vue.use(Router)

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta:{
        isShowSearch:false,
        url:'result',
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta:{
        isShowSearch:false
      }
    },
   
  ]
})
