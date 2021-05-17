// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import store from './store'

import echarts from 'echarts'
import jsPlumb  from "jsplumb";
import '@/assets/js/jquery.jsPlumb.min.js'
// import axios from 'axios'
import axios from './http'

import './permission' // 权限

import i18n from './i18n'
// 引入字体图标css (字体图标的使用：iconfont）
import '@/assets/font/iconfont/iconfont.css'
import "@/assets/css/font.css";
import "@/assets/css/layout.css";

//swiper
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper)



import App from './App'
import router from './router'

Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios
Vue.prototype.$store = store
// Vue.prototype.$jsPlumb = jsPlumb.jsPlumb

Vue.config.productionTip = false

// 配置全局变量
import globalVariable from '@/constant/global-variable'
Vue.prototype.GLOBAL = globalVariable;

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  axios,
  jsPlumb,
  store,
  components: { App },
  template: '<App/>'
})
