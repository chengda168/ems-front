import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './langs'
import ElementLocale from 'element-ui/lib/locale'
import { getLanguage, setLanguage } from '../../src/utils/auth'
Vue.use(VueI18n)

// 默认是中文
let lang = getLanguage() == 'en' ? 'en' : 'cn';
console.log("lang",lang)
setLanguage(lang)
const i18n = new VueI18n({
  locale: lang,
  messages
})
ElementLocale.i18n((key, value) => i18n.t(key, value)) //重点：为了实现element插件的多语言切换

export default i18n
