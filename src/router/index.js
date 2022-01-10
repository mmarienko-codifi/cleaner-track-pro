import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/worksites',
    name: 'Worksites',
    component: () => import('@/views/Worksites.vue')
  },
  {
    path: '/clients',
    name: 'Clients',
    component: () => import('@/views/Clients.vue')
  },
  {
    path: '/employees',
    name: 'Employees',
    component: () => import('@/views/Employees.vue')
  },
  {
    path: '/equipments',
    name: 'Equipments',
    component: () => import('@/views/Equipments.vue')
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: () => import('@/views/Jobs.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
