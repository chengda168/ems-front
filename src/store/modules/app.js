import { getLanguage, setLanguage, getDig, setDig } from '../../../src/utils/auth'
const app = {
  state: {
    lang:getLanguage() ||  'cn',
    searchObj:'',
    searchCountry:'',
    selectObj:{}
    // contactDig:getDig() || false,
  },
  mutations: {
    SET_LANG: (state, lang) => {
      state.lang = lang
    },
    SET_SELECT_OBJ: (state, searchObj) => {
      state.searchObj = searchObj
    },
    SET_COUNTRY: (state, searchCountry) => {
      state.searchCountry = searchCountry
    },
    SELECT_OBJ: (state, selectObj) => {
      state.selectObj = selectObj
    },
    
    // SET_DIG: (state, dig) => {
    //   state.contactDig = dig
    // },
  },
  actions: {
    setLang: ({commit}, lang) => {
      commit('SET_LANG', lang)
      setLanguage(lang)
    },
    setSelectObj: ({commit}, searchObj) => {
      console.log(searchObj)
      commit('SET_SELECT_OBJ', searchObj)
    },
    setCountry: ({commit}, searchCountry) => {
      console.log('searchCountry',searchCountry)
      commit('SET_COUNTRY', searchCountry)
    },
    selectObj: ({commit}, selectObj) => {
      console.log('selectObj',selectObj)
      commit('SELECT_OBJ', selectObj)
    },
    // setDig: ({commit}, dig) => {
    //   console.log("12",dig)
    //   commit('SET_DIG', dig)
    //   setDig(dig)
    // },
  }
}

export default app
