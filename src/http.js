import axios from 'axios'

import GLOBAL from '@/constant/global-variable'
import { getToken } from '../src/utils/auth'
import { Message } from 'element-ui'

// 请求超时时间
axios.defaults.timeout = 15000 * 60


// axios.defaults.baseURL = process.env.BASE_API

// poc后端请求地址 : http://103.19.25.33:8081
// 开发环境请求地址：http://gleagle-frame.cn.utools.club

// 环境的切换
if (process.env.NODE_ENV == "development") {
  // axios.defaults.baseURL = "http://103.19.25.33:8081/gleagle";
  // axios.defaults.baseURL = "/api";
  // axios.defaults.baseURL = GLOBAL.umsURL
} else if (process.env.NODE_ENV == "debug") {
  axios.defaults.baseURL = GLOBAL.umsURL
  // axios.defaults.baseURL = "http://personal2.shenzhuo.vip:21463/gleagle";
} else if (process.env.NODE_ENV == "production") {
  axios.defaults.baseURL = GLOBAL.deployURL;
  // axios.defaults.baseURL = "http://personal2.shenzhuo.vip:21463/gleagle";
}

axios.defaults.retry = 4
axios.defaults.retryDelay = 1000
axios.defaults.withCredentials = true;

// request拦截器
axios.interceptors.request.use(async config => {
  // console.log("getToken",getToken())
  if (getToken()) {
    config.headers['Authorization'] = getToken() || '';
  }
  return config
}, error => {
  // console.log('axios_err', error)  // for debug
  return Promise.reject(error)
})


// respone拦截器
axios.interceptors.response.use(
  response => {
    let data = response.data
    if (data.code !== true) {
      // if (data.code === '100019') {
      //   console.log('会员登录过期，请重新登录')
      //   return data
      // }
      // if (data.code.length === 6) {
      //   console.log(data.message)
      // }
      return response.data
      // return Promise.reject(data)
    } else {

      return response.data
    }
  },
  error => {
    // console.log('err', error)// for debug
    // console.log('err', error.response.status)// for debug
    // 处理服务端返回的状态
    if (error.response.status === 500) {
      // Message.error('服务端异常，请联系技术支持');
      console.log('服务端异常，请联系技术支持')
    } else if (error.response.status === 403) {
      console.log('会员登录过期，请重新登录')
    } else if (error.response.status === 401) {

    } else if (error.response.status === 404) {

    }
    return Promise.reject(error)
  }
)



export default axios
