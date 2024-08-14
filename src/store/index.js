import { createStore } from 'vuex'
import axios from 'axios';

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
    fetchPosts({ commit }) {
      axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
          const posts = response.data.map(post => {
            post.user = { name: `User ${post.userId}` }
            return post
          })
          commit('setPosts', posts)
        })
        .catch(error => {
          console.error("Error fetching posts:", error)
        })
    },
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
