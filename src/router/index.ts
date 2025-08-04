import { createRouter, createWebHistory } from 'vue-router'
import HourlyView from '../views/HourlyView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'hourly',
      component: HourlyView,
    },
    {
      path: '/daily',
      name: 'daily',
      component: () => import('../views/DailyView.vue'),
    },
  ],
})

export default router
