<template>
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold">Gönderiler</h1>
      <div class="flex justify-between my-4">
        <button @click="addSelectedUsers" class="btn btn-primary">Kullanıcı Ekle</button>
        <input v-model="searchQuery" type="text" placeholder="Kullanıcı Ara" class="input" />
      </div>
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>İsim Soyisim</th>
            <th>Başlık</th>
            <th>Kategori</th>
            <th>Son Güncelleme</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in filteredPosts" :key="post.id" @click="toggleDetails(post.id)">
            <td>{{ post.id }}</td>
            <td>{{ post.user.name }}</td>
            <td>{{ post.title }}</td>
            <td>Lorem</td>
            <td>17 Mart</td>
            <td>
              <input type="checkbox" v-model="selectedPostIds" :value="post.id" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        selectedPostIds: [],
        searchQuery: '',
      }
    },
    computed: {
      posts() {
        return this.$store.getters.getPosts
      },
      filteredPosts() {
        return this.posts.filter(post => post.user.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }
    },
    methods: {
      addSelectedUsers() {
        const selectedPosts = this.posts.filter(post => this.selectedPostIds.includes(post.id))
        selectedPosts.forEach(post => {
          this.$store.dispatch('addUser', post.user)
        })
      },
      toggleDetails(postId) {
        const post = this.posts.find(p => p.id === postId)
        post.expanded = !post.expanded
      }
    },
    mounted() {
      this.$store.dispatch('fetchPosts') // Vuex'ten verileri çekiyoruz
    }
  }
</script>