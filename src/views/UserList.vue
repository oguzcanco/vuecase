<template>
  <div class="flex">
    <!-- Sidebar -->
    <SideBar />

    <!-- Ana İçerik -->
    <div class="w-5/6 p-6">
      <!-- Üst Kısım -->
      <div class="flex justify-between mb-4">
        <div>
          <h1 class="text-2xl font-bold">Kayıtlı Kullanıcılar</h1>
        </div>
      </div>

      <!-- Data Table -->
      <table class="min-w-full bg-white border-collapse shadow-md rounded-lg overflow-hidden">
        <thead class="bg-gray-100">
          <tr>
            <th class="py-3 px-6 text-left text-gray-700">User ID</th>
            <th class="py-3 px-6 text-left text-gray-700">İsim Soyisim</th>
            <th class="py-3 px-6 text-left text-gray-700">E-posta</th>
            <th class="py-3 px-6 text-left text-gray-700">Doğum Tarihi</th>
            <th class="py-3 px-6 text-left text-gray-700">Telefon</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in selectedUsers" :key="user.id" class="hover:bg-gray-100 cursor-pointer">
            <td class="py-3 px-6">{{ user.id }}</td>
            <td class="py-3 px-6">{{ user.firstname }} {{ user.lastname }}</td>
            <td class="py-3 px-6">{{ user.email }}</td>
            <td class="py-3 px-6">{{ formatDate(user.birthDate) }}</td>
            <td class="py-3 px-6">{{ user.phone }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Sayfalama -->
      <div class="flex justify-center mt-6 space-x-2">
        <button @click="prevPage" :disabled="currentPage === 1" class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 disabled:opacity-50">
          <ArrowLeftIcon class="h-4 w-4 text-gray-600" />
        </button>
        
        <button v-for="page in totalPages" :key="page" @click="currentPage = page" :class="{'bg-blue-500 text-white': currentPage === page, 'bg-gray-200 text-gray-700': currentPage !== page}" class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white">
          {{ page }}
        </button>
        
        <button @click="nextPage" :disabled="currentPage === totalPages" class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 disabled:opacity-50">
          <ArrowRightIcon class="h-4 w-4 text-gray-600" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/vue/20/solid';
import SideBar from '@/components/SideBar.vue'; // Sidebar component'ini import ediyoruz

export default {
  components: {
    SideBar, // Sidebar'ı kullanıma alıyoruz
    ArrowRightIcon, // İkon bileşenini tanımlıyoruz
    ArrowLeftIcon, // İkon bileşenini tanımlıyoruz
  },
  data() {
    return {
      currentPage: 1,
      rowsPerPage: 10, // Sayfa başına gösterilecek kullanıcı sayısı
    }
  },
  mounted() {
    const selectedUsers = this.$store.dispatch('loadUsers'); // LocalStorage'dan kullanıcıları yükler
    console.log("Selected Users in Store on Users.vue Mounted:", selectedUsers);
  },
  computed: {
    selectedUsers() {
      // Store'dan kullanıcıları alıyoruz
      const users = this.$store.getters.getSelectedUsers;
      console.log("Selected Users in Users.vue:", users);
      return users;
    },
    paginatedUsers() {
      const start = (Number(this.currentPage) - 1) * Number(this.rowsPerPage);
      const end = start + Number(this.rowsPerPage);
      
      const paginated = this.selectedUsers.slice(start, end);
      console.log("Paginated Users in Users.vue:", paginated);
      
      return paginated;
    },
    totalPages() {
      return Math.ceil(this.selectedUsers.length / this.rowsPerPage);
    }
  },
  methods: {
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
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('tr-TR', options);
    }
  }
}
</script>

<style scoped>
/* Ekstil yok, Tailwind kullanıyoruz */
</style>
