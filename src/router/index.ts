import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/demoPage',
    },
    {
      path: '/demoPage',
      name: 'demoPage', // 工位预约列表
      component: () => import('@/views/DemoPage.vue'),
    },
  ],
});

export default router;
