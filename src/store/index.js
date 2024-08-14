import { createStore } from 'vuex'

export default createStore({
  state: {
    posts: [],
    selectedUsers: [],
  },
  mutations: {
    setPosts(state, posts) {
        state.posts = posts;
    },
  },
  actions: {
    addUser({ commit }, user) {
      commit('addUser', user)
    },
  },
  getters: {
    getPosts(state) {
      return state.posts;
    },
    getSelectedUsers(state) {
      return state.selectedUsers;
    }
  },
  modules: {},
})
