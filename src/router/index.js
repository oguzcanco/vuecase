import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import UserList from '../views/UserList.vue'

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/users', name: 'Users', component: UserList },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
