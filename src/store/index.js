import { createStore } from 'vuex'
const SET_USER = 'SET_USER'
export default createStore({
  state: {
    user: {
      name: 'Member',
      photo: '',
      _id: '',
    },
  },
  mutations: {
    [SET_USER](state, params) {
      Object.keys(params).forEach((key) => {
        if (state.user[key] !== undefined) {
          state.user[key] = params[key]
        }
      })
    },
  },
  actions: {
    setUser({ commit }, params) {
      commit(SET_USER, params)
    },
  },
})
