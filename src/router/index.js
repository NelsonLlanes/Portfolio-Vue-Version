import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'

import QuickQrCodeView from '@/views/tools/QuickQrCodeView.vue'

import QuickQrProjectView from '@/views/projects/QuickQrProjectView.vue'
import InventoryProjectView from '@/views/projects/InventoryProjectView.vue'
import ExpenseTrackerProjectView from '@/views/projects/ExpenseTrackerProjectView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    // Projects

    {
      path: '/projects/quick-qr',
      name: 'project-quick-qr',
      component: QuickQrProjectView,
    },
    {
      path: '/projects/inventory-procurement',
      name: 'project-inventory-procurement',
      component: InventoryProjectView,
    },
    {
      path: '/projects/expense-tracker',
      name: 'project-expense-tracker',
      component: ExpenseTrackerProjectView,
    },

    // Tools

    {
      path: '/tools/Quick-qr-code',
      name: 'quick-qr',
      component: QuickQrCodeView,
    },
  ],
})

export default router
