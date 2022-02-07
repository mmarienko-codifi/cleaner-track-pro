import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    meta: { layout: 'home' },
    component: () => import('@/views/Main.vue'),
  },
  {
    path: '/login',
    meta: { layout: 'empty' },
    component: () => import('@/views/auth/Login.vue'),
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
    component: () => import('@/views/client/Edit.vue'),
  },
  {
    path: '/employees/list',
    component: () => import('@/views/employee/List.vue'),
  },
  {
    path: '/employees/create',
    component: () => import('@/views/employee/New.vue'),
  },
  {
    path: '/employees/:id/read',
    props: true,
    component: () => import('@/views/employee/Info.vue'),
  },
  {
    path: '/employees/:id/update',
    props: true,
    component: () => import('@/views/employee/Edit.vue'),
  },
  {
    path: '/equipment/list',
    component: () => import('@/views/equipment/List.vue'),
  },
  {
    path: '/equipment/create',
    component: () => import('@/views/equipment/New.vue'),
  },
  {
    path: '/equipment/:id/read',
    props: true,
    component: () => import('@/views/equipment/Info.vue'),
  },
  {
    path: '/equipment/:id/update',
    props: true,
    component: () => import('@/views/equipment/Edit.vue'),
  },
  {
    path: '/jobs/list',
    component: () => import('@/views/job/List.vue'),
  },
  {
    path: '/jobs/create',
    component: () => import('@/views/job/New.vue'),
  },
  {
    path: '/jobs/:id/read',
    props: true,
    component: () => import('@/views/job/Info.vue'),
  },
  {
    path: '/jobs/:id/update',
    props: true,
    component: () => import('@/views/job/Edit.vue'),
  },
  {
    path: '/worksites/list',
    component: () => import('@/views/worksite/List.vue'),
  },
  {
    path: '/worksites/create',
    component: () => import('@/views/worksite/New.vue'),
  },
  {
    path: '/worksites/:id/read',
    props: true,
    component: () => import('@/views/worksite/Info.vue'),
  },
  {
    path: '/worksites/:id/update',
    props: true,
    component: () => import('@/views/worksite/Edit.vue'),
  },
  {
    path: '/reports/invoice',
    component: () => import('@/views/reports/Invoice.vue'),
  },
  {
    path: '/reports/earnings',
    component: () => import('@/views/reports/Earnings.vue'),
  },
  {
    path: '/reports/expense',
    component: () => import('@/views/reports/Expense.vue'),
  },
  {
    path: '/:notFound(.*)',
    meta: { layout: 'empty' },
    component: () => import('@/views/404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
