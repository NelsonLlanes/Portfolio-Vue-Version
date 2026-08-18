import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import QuickQrCodeView from '@/views/tools/QuickQrCodeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/tools/Quick-qr-code',
      name: 'quick-qr',
      component: QuickQrCodeView,
    },
  ],
})

export default router
