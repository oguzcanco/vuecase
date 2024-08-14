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
              <UserIcon class="h-5 w-5 mr-2" /> <!-- Icon bileşeni kullanılıyor -->
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
                  <ArrowDownIcon v-if="sortOrder === 'asc'" class="h-4 w-4 ml-2 text-gray-500" />
                  <ArrowUpIcon v-else class="h-4 w-4 ml-2 text-gray-500" /> <!-- Icon bileşeni kullanılıyor -->
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
            <tr v-show="post.expanded" v-for="post in paginatedPosts" :key="post.id + '-expanded'" class="bg-gray-50">
              <td colspan="6" class="py-3 px-6">
                <!-- Buraya expand edilen içeriği ekleyin -->
                <div class="flex items-center">
                  <img src="path-to-your-image" alt="User Image" class="h-12 w-12 rounded-full mr-4">
                  <div>
                    <p class="font-bold">{{ post.user.name }}</p>
                    <p>{{ post.user.email }}</p>
                    <p>{{ post.user.phone }}</p>
                    <p>{{ post.user.address }}</p>
                  </div>
                </div>
                <div class="mt-4">
                  <p class="font-bold">{{ post.title }}</p>
                  <p>{{ post.content }}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
  
        <!-- Sayfalama -->
        <div class="flex justify-center mt-6 space-x-2">
          <button @click="prevPage" :disabled="currentPage === 1" class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 disabled:opacity-50">
            <ArrowLeftIcon class="h-4 w-4 text-gray-600" /> <!-- Icon bileşeni kullanılıyor -->
          </button>
          
          <button v-for="page in totalPages" :key="page" @click="currentPage = page" :class="{'bg-blue-500 text-white': currentPage === page, 'bg-gray-200 text-gray-700': currentPage !== page}" class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white">
            {{ page }}
          </button>
          
          <button @click="nextPage" :disabled="currentPage === totalPages" class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 disabled:opacity-50">
            <ArrowRightIcon class="h-4 w-4 text-gray-600" /> <!-- Icon bileşeni kullanılıyor -->
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ArrowRightIcon, ArrowLeftIcon, ArrowUpIcon, ArrowDownIcon, UserIcon } from '@heroicons/vue/20/solid';
  import SideBar from '@/components/SideBar.vue'; // Sidebar component'ini import ediyoruz
  
  export default {
    components: {
      SideBar, // Sidebar'ı kullanıma alıyoruz
      ArrowRightIcon, // İkon bileşenini tanımlıyoruz
      ArrowLeftIcon, // İkon bileşenini tanımlıyoruz
      ArrowUpIcon, // İkon bileşenini tanımlıyoruz
      ArrowDownIcon, // İkon bileşenini tanımlıyoruz
      UserIcon, // İkon bileşenini tanımlıyoruz
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
        this.$set(post, 'expanded', !post.expanded);
      }
    },
    mounted() {
      this.$store.dispatch('fetchPosts') // Vuex'ten verileri çekiyoruz
    }
  }
</script>
  
<style scoped>
</style>