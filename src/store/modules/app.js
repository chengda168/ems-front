import { getLanguage, setLanguage, getDig, setDig } from '../../../src/utils/auth'
const app = {
  state: {
    lang:getLanguage() ||  'Cn',
    collapse:false
  },
  mutations: {
    SET_LANG: (state, lang) => {
      state.lang = lang
    },
    SET_COLLAPSE: (state, collapse) => {
      state.collapse = collapse
    },
    
  },
  actions: {
    setLang: ({commit}, lang) => {
      commit('SET_LANG', lang)
      setLanguage(lang)
    },
    setCollapse: ({commit}, collapse) => {
      console.log(collapse)
      commit('SET_COLLAPSE', collapse)
    },
  }
}

export default app
