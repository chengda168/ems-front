import { getToken,setToken,removeToken} from '../../../src/utils/auth'
const user = {
  state: {
    token: getToken() || null,
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      console.log("token",token)
      state.token = token
    }
  },
  actions: {
    // 用户登录
    Token({commit}, token) {
      console.log("token",token)
      if (token === undefined) {
        return false
      }
      setToken(token)
      commit('SET_TOKEN', token)
      // return data
    },
    // 退出
    LogOut({commit, state}) {
      removeToken()
      commit('SET_TOKEN', null)
      // removeLanguage()
      // removeCompany()
    },
  }
}

export default user
