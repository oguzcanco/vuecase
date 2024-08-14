<template>
    <nav class="w-1/6 bg-gray-100 h-screen p-6 shadow-md">
      <h2 class="text-gray-500 text-lg mb-8">MENÜ</h2>
      <ul class="space-y-4">
        <li>
          <router-link to="/" class="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded flex items-center">
            <HomeIcon class="h-5 w-5 mr-2" /> <!-- Icon bileşeni kullanılıyor -->
            Gönderiler
          </router-link>
        </li>
        <li>
          <router-link to="/users" class="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded flex items-center">
            <UserIcon class="h-5 w-5 mr-2" /> <!-- Icon bileşeni kullanılıyor -->
            Kullanıcılar
          </router-link>
        </li>
      </ul>
    </nav>
</template>
  
<script>
    import { UserIcon, HomeIcon } from '@heroicons/vue/20/solid';

    export default {
        name: 'SideBar',
        components: {
            HomeIcon,
            UserIcon
        }
    }
</script>

<style scoped>
/* Stil ekleyebilirsin */
</style>