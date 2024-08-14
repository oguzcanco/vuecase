<template>
    <nav class="w-1/6 bg-gray-100 h-screen p-6 shadow-md">
      <h2 class="text-gray-500 text-lg mb-8">MENÜ</h2>
      <ul class="space-y-4">
        <li>
          <router-link to="/" class="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 7h18M3 12h18m-9 5h9" />
            </svg>
            Gönderiler
          </router-link>
        </li>
        <li>
          <router-link to="/users" class="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16m-7 4h7" />
            </svg>
            Kullanıcılar
          </router-link>
        </li>
      </ul>
    </nav>
</template>
  
<script>
  export default {
    name: 'SideBar'
  }
</script>
  
<style scoped>
/* Stil ekleyebilirsin */
</style>