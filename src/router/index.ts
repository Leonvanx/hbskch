import { createRouter, createWebHistory } from 'vue-router';
import BasicLayout from '@/components/layout/BasicLayout.vue';
import { isAuthenticated } from '@/utils/loginCheck';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home/Home.vue'),
    children: [
      {
        path: '/home/subMenuArticleList',
        name: 'subMenuArticleList',
        component: () => import('@/views/Home/SubMenuArticleList.vue'),
      },
      {
        path: '/home/articleDetail',
        name: 'articleDetail',
        component: () => import('@/views/Home/ArticleDetail.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: BasicLayout,
    redirect: '/admin/menuManagement',
    children: [
      {
        path: 'admin',
        name: 'admin',
        meta: { label: '首页管理', iconName: 'menu' },
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

router.beforeEach((to, from, next) => {
  if (!isAuthenticated() && to.fullPath.indexOf('/admin') != -1) {
    // 假设 isAuthenticated() 是检查用户是否认证的函数
    next({ path: '/login' }); // 重定向到登录页或首页
  } else {
    next(); // 确保一定要调用 next()
  }
});

export default router;
export { routes };
