import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'empty' },
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'auth' },
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/clients',
    name: 'Clients',
    meta: { layout: 'default' },
    component: () => import('@/views/Clients.vue')
  },
  {
    path: '/employees',
    name: 'Employees',
    meta: { layout: 'default' },
    component: () => import('@/views/Employees.vue')
  },
  {
    path: '/equipments',
    name: 'Equipments',
    meta: { layout: 'default' },
    component: () => import('@/views/Equipments.vue')
  },
  {
    path: '/jobs',
    name: 'Jobs',
    meta: { layout: 'default' },
    component: () => import('@/views/Jobs.vue')
  },
  {
    path: '/worksites',
    name: 'Worksites',
    meta: { layout: 'default' },
    component: () => import('@/views/Worksites.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
