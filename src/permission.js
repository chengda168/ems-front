import router from './router'
import { getToken } from '@/utils/auth'
// import store from './store'
// import { getToken } from '../src/utils/auth'

// const whiteList = ['/login', '/register', '/forgetPass', '/','/layout/detail', '/layout/result',,'/enterprise','/enterprises/login' ] // 不重定向白名单
// router.beforeEach((to, from, next) => {
//     console.log(to,from)
//     if(getToken()){
//         next()
//     }else{
//         if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
//             next()
//         } else {
//             next({path:'/login',query:{url: to.fullPath} })
//             //next('/login') // 否则全部重定向到登录页
//         }
//     }
   
// })
// this.$router.push(this.$router.currentRoute.query.url)这里的代码可以直接跳转到需要登录的界面

