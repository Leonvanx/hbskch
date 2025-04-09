import { createRouter, createWebHistory } from 'vue-router';
import BasicLayout from '@/components/layout/BasicLayout.vue';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home/Home.vue'),
  },
  {
    path: '/admin',
    component: BasicLayout,
    children: [
      {
        path: '',
        name: 'index',
        meta: { label: '后管首页' },
        component: () => import('@/views/Admin/Index.vue'),
      },
      {
        path: 'management',
        name: 'management',
        meta: { label: '菜单维护' },
        component: () => import('@/views/Admin/Management.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/Admin/Login.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
export { routes };
