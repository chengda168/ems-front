import { getToken, setToken, removeToken } from '../../../src/utils/auth'
const user = {
  state: {
    token: getToken() || null,
    user: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      console.log("token", token)
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    CLEAR_USER: (state) => {
      state.user = {};
    }
  },
  actions: {
    // 用户登录
    Token({ commit }, token) {
      console.log("token", token)
      if (token === undefined) {
        return false
      }
      setToken(token)
      commit('SET_TOKEN', token)
      // return data
    },
    Login({ commit }, user) {
      commit('SET_USER', user)
    },
    // 退出
    LogOut({ commit, state }) {
      removeToken()
      commit('SET_TOKEN', null)
      commit('CLEAR_USER');
      // removeLanguage()
      // removeCompany()
    },
  }
}

export default user
