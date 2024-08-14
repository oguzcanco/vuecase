<template>
    <div class="flex">
      <!-- Sol Menü -->
      <nav class="w-1/6 bg-gray-100 h-screen p-4">
        <ul>
          <li class="mb-2">
            <router-link to="/" class="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
              Gönderiler
            </router-link>
          </li>
          <li>
            <router-link to="/users" class="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
              Kullanıcılar
            </router-link>
          </li>
        </ul>
      </nav>
  
      <!-- Ana İçerik -->
      <div class="w-5/6 p-6">
        <!-- Üst Kısım: Kullanıcı Ekleme ve Arama -->
        <div class="flex justify-between mb-4">
          <div>
            <button @click="addSelectedUsers" class="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center shadow hover:bg-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 9a3 3 0 116 0 3 3 0 01-6 0z" />
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clip-rule="evenodd" />
              </svg>
              Kullanıcı Ekle
            </button>
          </div>
          <div class="flex items-center">
            <input v-model="searchQuery" type="text" placeholder="Kullanıcı Ara" class="border border-gray-300 rounded-lg py-2 px-4 focus:ring focus:ring-blue-300 focus:outline-none mr-4">
            <select v-model="rowsPerPage" class="border border-gray-300 rounded-lg py-2 px-4 focus:ring focus:ring-blue-300 focus:outline-none">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
  
        <!-- Data Table -->
        <table class="min-w-full bg-white border-collapse">
          <thead class="bg-gray-100">
            <tr>
              <th class="py-2 px-4 border-b text-left">ID</th>
              <th class="py-2 px-4 border-b text-left">İsim Soyisim</th>
              <th class="py-2 px-4 border-b text-left">Başlık</th>
              <th class="py-2 px-4 border-b text-left">Kategori</th>
              <th class="py-2 px-4 border-b text-left">Son Güncelleme</th>
              <th class="py-2 px-4 border-b text-center"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in paginatedPosts" :key="post.id" class="hover:bg-gray-50">
              <td class="py-2 px-4 border-b">{{ post.id }}</td>
              <td class="py-2 px-4 border-b">{{ post.user.name }}</td>
              <td class="py-2 px-4 border-b">{{ post.title }}</td>
              <td class="py-2 px-4 border-b">Lorem</td>
              <td class="py-2 px-4 border-b">17 Mart</td>
              <td class="py-2 px-4 border-b text-center">
                <input type="checkbox" v-model="selectedPostIds" :value="post.id" class="form-checkbox h-4 w-4 text-blue-500">
              </td>
            </tr>
          </tbody>
        </table>
  
        <!-- Sayfalama -->
        <div class="flex justify-between mt-4">
          <button @click="prevPage" :disabled="currentPage === 1" class="bg-gray-500 text-white py-2 px-4 rounded-lg shadow hover:bg-gray-600 disabled:opacity-50">
            Önceki
          </button>
          <span class="self-center">Sayfa {{ currentPage }} / {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="bg-gray-500 text-white py-2 px-4 rounded-lg shadow hover:bg-gray-600 disabled:opacity-50">
            Sonraki
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedPostIds: [],
        searchQuery: '',
        currentPage: 1,
        rowsPerPage: 10, // Sayfa başına gösterilecek satır sayısı
      }
    },
    computed: {
      posts() {
        return this.$store.getters.getPosts
      },
      filteredPosts() {
        return this.posts.filter(post => post.user.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
      },
      paginatedPosts() {
        const start = (this.currentPage - 1) * this.rowsPerPage;
        const end = start + this.rowsPerPage;
        return this.filteredPosts.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.filteredPosts.length / this.rowsPerPage);
      }
    },
    methods: {
      addSelectedUsers() {
        const selectedPosts = this.posts.filter(post => this.selectedPostIds.includes(post.id))
        selectedPosts.forEach(post => {
          this.$store.dispatch('addUser', post.user)
        })
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      }
    },
    mounted() {
      this.$store.dispatch('fetchPosts') // Vuex'ten verileri çekiyoruz
    }
  }
  </script>
  
  <style scoped>
  /* İhtiyaç varsa ek stilleri buraya ekleyebilirsiniz */
  </style>
  