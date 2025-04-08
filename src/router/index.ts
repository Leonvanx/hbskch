import { createRouter, createWebHashHistory } from 'vue-router';
import BasicLayout from '@/components/BasicLayout.vue';
import HomeView from '../views/Home/Home.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      component: BasicLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'demoPage',
          name: 'demoPage',
          component: () => import('@/views/DemoPage.vue'),
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
