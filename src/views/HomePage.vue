<template>
    <div class="flex">
      <!-- Sidebar -->
      <SideBar />
  
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
                <span class="flex items-center cursor-pointer" @click="sortBy('id')">
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
            <tr v-for="post in paginatedPosts" :key="post.id" :class="{ 'bg-gray-50': post.id % 2 === 0, 'bg-green-100': selectedPostIds.includes(post.id) }" class="hover:bg-gray-100 cursor-pointer" @click="toggleExpand(post)">
              <td class="py-3 px-6">{{ post.id }}</td>
              <td class="py-3 px-6">{{ post.user.name }}</td>
              <td class="py-3 px-6">{{ post.title }}</td>
              <td class="py-3 px-6">Lorem</td>
              <td class="py-3 px-6">17 Mart</td>
              <td class="py-3 px-6 text-center">
                <input type="checkbox" v-model="selectedPostIds" :value="post.id" class="form-checkbox h-4 w-4 text-blue-500">
              </td>
            </tr>
            <!-- Expandable Content -->
            <tr v-for="expandedPost in expandedPosts" :key="expandedPost.id + '-expanded'" class="bg-gray-50">
              <td colspan="6" class="p-4">
                <div class="flex">
                  <div class="mr-4">
                    <img src="path-to-image.jpg" alt="User Image" class="w-16 h-16 rounded-full">
                  </div>
                  <div>
                    <h3 class="text-lg font-bold">{{ expandedPost.user.name }}</h3>
                    <p>{{ expandedPost.user.email }}</p>
                    <p>{{ expandedPost.user.date_of_birth }}</p>
                    <p>{{ expandedPost.user.phone }}</p>
                  </div>
                  <div class="ml-auto">
                    <p>{{ expandedPost.title }}</p>
                    <p>{{ expandedPost.content }}</p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
  
        <!-- Sayfalama -->
        <div class="flex justify-center mt-6 space-x-2">
          <button @click="prevPage" :disabled="currentPage === 1" class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 disabled:opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.707 9.293a1 1 0 000 1.414l4 4a1 1 0 001.414-1.414L10.414 10l3.707-3.707a1 1 0 00-1.414-1.414l-4 4z" clip-rule="evenodd" />
            </svg>
          </button>
          
          <button v-for="page in totalPages" :key="page" @click="currentPage = page" :class="{'bg-blue-500 text-white': currentPage === page, 'bg-gray-200 text-gray-700': currentPage !== page}" class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white">
            {{ page }}
          </button>
          
          <button @click="nextPage" :disabled="currentPage === totalPages" class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 disabled:opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.293 9.293a1 1 0 010 1.414l-4 4a1 1 0 11-1.414-1.414L9.586 10 6.293 6.707a1 1 0 011.414-1.414l4 4z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import SideBar from '@/components/SideBar.vue'; // Sidebar component'ini import ediyoruz
  
  export default {
    components: {
      SideBar, // Sidebar'ı kullanıma alıyoruz
    },
    data() {
      return {
        selectedPostIds: [],
        searchQuery: '',
        currentPage: 1,
        rowsPerPage: 5,
        sortOrder: 'asc', // Sıralama yönü: 'asc' veya 'desc'
        sortField: 'id', // Sıralama yapılacak alan
      }
    },
    computed: {
      posts() {
        return this.$store.getters.getPosts
      },
      filteredPosts() {
        let sortedPosts = [...this.posts];
  
        // Sıralama işlemi
        sortedPosts.sort((a, b) => {
          let result = 0;
  
          if (a[this.sortField] < b[this.sortField]) {
            result = -1;
          } else if (a[this.sortField] > b[this.sortField]) {
            result = 1;
          }
  
          return this.sortOrder === 'asc' ? result : -result;
        });
  
        return sortedPosts.filter(post =>
          post.user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
      paginatedPosts() {
        const start = (Number(this.currentPage) - 1) * Number(this.rowsPerPage);
        const end = start + Number(this.rowsPerPage);
        
        return this.filteredPosts.slice(start, end);
      },
      expandedPosts() {
        return this.paginatedPosts.filter(post => post.expanded);
      },
      totalPages() {
        // Toplam sayfa sayısını hesaplayın
        return Math.ceil(this.filteredPosts.length / this.rowsPerPage);
      }
    },
    watch: {
      rowsPerPage() {
        // rowsPerPage değiştiğinde currentPage'i sıfırla
        this.currentPage = 1;
      },
      filteredPosts() {
        // Veriler değiştiğinde currentPage'i sıfırla
        this.currentPage = 1;
      },
      currentPage() {
        // currentPage geçerli bir sayfa aralığında değilse ayarlayın
        if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages;
        }
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
      },
      sortBy(field) {
        if (this.sortField === field) {
          // Aynı alana tekrar tıklanırsa, sıralama yönünü tersine çevir
          this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
          // Yeni bir alan sıralandığında, sıralama yönünü 'asc' olarak başlat
          this.sortField = field;
          this.sortOrder = 'asc';
        }
      },
      toggleExpand(post) {
        post.expanded = !post.expanded;
      }
    },
    mounted() {
      this.$store.dispatch('fetchPosts') // Vuex'ten verileri çekiyoruz
    }
  }
</script>
  
<style scoped>
</style>