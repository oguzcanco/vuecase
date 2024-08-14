<template>
    <div v-if="show" class="fixed bottom-5 right-5 max-w-xs w-full bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center justify-between">
      <span>{{ message }}</span>
      <button @click="close" class="ml-4 text-white hover:text-gray-200">&times;</button>
    </div>
</template>
  
<script>
  export default {
    props: {
      message: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        show: true,
      };
    },
    methods: {
      close() {
        this.show = false;
      },
    },
    mounted() {
      setTimeout(() => {
        this.show = false;
      }, 4000); // 3 saniye sonra otomatik kapanır
    },
  };
</script>