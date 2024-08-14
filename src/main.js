import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Vue Router'ı import ediyoruz
import store from './store' // Vuex store'u import ediyoruz
import './assets/tailwind.css'

createApp(App).use(router).use(store).mount('#app') // Router ve store'u uygulamaya dahil ediyoruz
