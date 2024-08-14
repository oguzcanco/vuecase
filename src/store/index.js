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
    addUser(state, user) {
        if (!state.selectedUsers.some(u => u.id === user.id)) {
          console.log("User added to store:", user);
          state.selectedUsers.push(user);
          localStorage.setItem('selectedUsers', JSON.stringify(state.selectedUsers)); // Kullanıcıları localStorage'a kaydediyoruz
        }
    },
  },
  actions: {
    fetchPosts({ commit }) {
        // Öncelikle post verilerini alıyoruz
        axios.get('https://jsonplaceholder.org/posts')
          .then(response => {
            const posts = response.data;
    
            // Tüm kullanıcıları alıyoruz
            axios.get('https://jsonplaceholder.org/users')
              .then(userResponse => {
                const users = userResponse.data;
    
                // Postlara kullanıcıları atıyoruz
                const postsWithUsers = posts.map(post => {
                  const user = users[post.userId % users.length];
    
                  // Rastgele erkek ya da kadın resmi seçmek için
                  const gender = Math.random() > 0.5 ? 'men' : 'women';
                  const randomImageUrl = `https://randomuser.me/api/portraits/${gender}/${user.id % 100}.jpg`;
  
                  const fullname = `${user.firstname} ${user.lastname}`;
    
                  post.user = {
                    ...user,
                    fullname: fullname, // fullname'i ekliyoruz
                    profilePicture: randomImageUrl // Kullanıcının profil resmini ekliyoruz
                  };
                  return post;
                });
    
                // Store'a verileri commit ediyoruz
                commit('setPosts', postsWithUsers);
              })
              .catch(error => {
                console.error("Error fetching users:", error);
              });
          })
          .catch(error => {
            console.error("Error fetching posts:", error);
          });
    },
    addUser({ commit }, user) {
        commit('addUser', user);
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
