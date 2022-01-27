import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    meta: { layout: 'home' },
    component: () => import('@/views/Main.vue')
  },
  {
    path: '/login',
    meta: { layout: 'empty' },
    component: () => import('@/views/auth/Login.vue')
  },
  {
    path: '/clients/list',
    component: () => import('@/views/client/List.vue'),
  },
  {
    path: '/clients/create',
    component: () => import('@/views/client/New.vue'),
  },
  {
    path: '/clients/:id/read',
    props: true,
    component: () => import('@/views/client/Info.vue'),
  },
  {
    path: '/clients/:id/update',
    props: true,
    component: () => import('@/views/client/Edit.vue')
  },
  {
    path: '/employees/list',
    component: () => import('@/views/employee/List.vue')
  },
  {
    path: '/equipments/list',
    component: () => import('@/views/equipment/List.vue')
  },
  {
    path: '/jobs/list',
    component: () => import('@/views/job/List.vue')
  },
  {
    path: '/worksites/list',
    component: () => import('@/views/worksite/List.vue')
  },
  {
    path: '/:notFound(.*)',
    meta: { layout: 'empty' },
    component: () => import('@/views/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
