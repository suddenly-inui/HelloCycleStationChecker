import { createRouter, createWebHistory } from 'vue-router'
import FavouriteStation from '@/views/FavouriteStation.vue'
import HomeView from '@/views/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/favourite',
      name: 'favourite',
      component: FavouriteStation
    }
  ]
})

export default router
