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

//swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'   
import 'swiper/dist/css/swiper.css'



// 引入字体图标css (字体图标的使用：iconfont）
import '@/assets/font/iconfont/iconfont.css'
import "@/assets/css/font.css";
import "@/assets/css/layout.css";




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

// 配置系统常量
import Constant from '@/constant/system-constant'
Vue.prototype.Constant = Constant;

// 全局引入自定义typeFormatter
import TypeFormatter from "./utils/TypeFormatter";
Vue.prototype.$typeFormatter = TypeFormatter.typeFormatter;

// 全局引入深拷贝方法
import { deepCopy,copyBean } from "./utils/datatransfer.js";
Vue.prototype.$deepCopy = deepCopy;
Vue.prototype.$copyBean = copyBean;

// 全局引入自定义reset
import { resetForm } from "./utils/reset.js";
Vue.prototype.$resetForm = resetForm;

Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper);

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
