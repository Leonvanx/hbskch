import { createRouter, createWebHashHistory } from 'vue-router';
import BasicLayout from '@/components/layout/BasicLayout.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
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
          component: () => import('@/views/Admin/Index.vue'),
        },

        {
          path: 'management',
          name: 'Management',
          component: () => import('@/views/Admin/Management.vue'),
        },
      ],
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/Admin/Login.vue'),
    },
  ],
});

export default router;
