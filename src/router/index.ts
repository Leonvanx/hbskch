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
        meta: { label: '首页管理' },
        component: () => import('@/views/Admin/Index.vue'),
      },
      {
        path: 'menuManagement',
        name: 'menuManagement',
        meta: { label: '菜单管理', iconName: 'menu' },
        component: () => import('@/views/Admin/MenuManagement.vue'),
      },
      {
        path: 'management',
        name: 'management',
        meta: { label: '内容管理', iconName: 'article' },
        component: () => import('@/views/Admin/Management.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Admin/Login.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
export { routes };
