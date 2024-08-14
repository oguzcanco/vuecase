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
            <button @click="addSelectedUsers" class="bg-blue-500 text-white py-2 px-4 rounded-full flex items-center shadow-lg hover:bg-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 9a3 3 0 116 0 3 3 0 01-6 0z" />
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clip-rule="evenodd" />
              </svg>
              Kullanıcı Ekle
            </button>
          </div>
          <div class="flex items-center">
            <input v-model="searchQuery" type="text" placeholder="Kullanıcı Ara" class="border border-gray-300 rounded-full py-2 px-4 focus:ring focus:ring-blue-300 focus:outline-none mr-4 shadow-sm">
            <select v-model="rowsPerPage" class="border border-gray-300 rounded-full py-2 px-4 focus:ring focus:ring-blue-300 focus:outline-none shadow-sm">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
  
        <!-- Data Table -->
        <table class="min-w-full bg-white border-collapse shadow-md rounded-lg overflow-hidden">
          <thead class="bg-gray-100">
            <tr>
              <th class="py-3 px-6 text-left text-gray-700">
                <span class="flex items-center">
                  ID
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.292 7.707a1 1 0 011.415 0L10 11.586l3.293-3.879a1 1 0 011.415 1.415l-4 4.67a1 1 0 01-1.415 0l-4-4.67a1 1 0 010-1.415z" clip-rule="evenodd" />
                  </svg>
                </span>
              </th>
              <th class="py-3 px-6 text-left text-gray-700">İsim Soyisim</th>
              <th class="py-3 px-6 text-left text-gray-700">Başlık</th>
              <th class="py-3 px-6 text-left text-gray-700">Kategori</th>
              <th class="py-3 px-6 text-left text-gray-700">Son Güncelleme</th>
              <th class="py-3 px-6 text-center text-gray-700"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in paginatedPosts" :key="post.id" :class="{ 'bg-gray-50': post.id % 2 === 0, 'bg-green-100': selectedPostIds.includes(post.id) }" class="hover:bg-gray-100 cursor-pointer">
              <td class="py-3 px-6">{{ post.id }}</td>
              <td class="py-3 px-6">{{ post.user.name }}</td>
              <td class="py-3 px-6">{{ post.title }}</td>
              <td class="py-3 px-6">Lorem</td>
              <td class="py-3 px-6">17 Mart</td>
              <td class="py-3 px-6 text-center">
                <input type="checkbox" v-model="selectedPostIds" :value="post.id" class="form-checkbox h-4 w-4 text-blue-500">
              </td>
            </tr>
          </tbody>
        </table>
  
        <!-- Sayfalama -->
        <div class="flex justify-between mt-6">
          <button @click="prevPage" :disabled="currentPage === 1" class="bg-gray-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-gray-600 disabled:opacity-50">
            Önceki
          </button>
          <span class="self-center">Sayfa {{ currentPage }} / {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="bg-gray-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-gray-600 disabled:opacity-50">
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
</style>