import { createStore } from 'vuex'
const SET_USER = 'SET_USER'
const localUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : { name: '', photo: '', _id: '', followers: [], following: [] }

export default createStore({
  state: {
    user: {
      name: localUser.name,
      photo: localUser.photo,
      _id: localUser._id,
      followers: localUser.followers,
      following: localUser.following,
    },
  },
  mutations: {
    [SET_USER](state, params) {
      Object.keys(params).forEach((key) => {
        if (state.user[key] !== undefined) {
          state.user[key] = params[key]
        }
      })
      localStorage.setItem('user', JSON.stringify(state.user))
    },
  },
  actions: {
    setUser({ commit }, params) {
      commit(SET_USER, params)
    },
  },
})
