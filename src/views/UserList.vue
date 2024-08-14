<template>
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold">Kullanıcılar</h1>
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>İsim Soyisim</th>
            <th>Başlık</th>
            <th>Kategori</th>
            <th>Son Güncelleme</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ user.name }}</td>
            <td>Lorem ipsum dolor sit amet</td>
            <td>Lorem</td>
            <td>17 Mart</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>
  
<script>
  export default {
    computed: {
      users() {
        return this.$store.getters.getSelectedUsers
      }
    }
  }
</script>