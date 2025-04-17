<!--
  功能：首页
  作者：xulf
  邮箱：lvin_xu@outlook.com
  时间：2025年04月08日 20:49:06
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div class="home-page flex-column">
    <HomeHeader />
    <ArticleSearch v-if="isHomePage || isSubmenuPage" />
    <ArticleContent v-if="isHomePage" :sub-menu-id="menuList?.[1]?.children?.[0]?.id" />
    <RouterView v-if="!isHomePage" />
    <HomeBottom />
  </div>
</template>

<script setup lang="ts">
import HomeHeader from './components/Header.vue';
import ArticleSearch from './components/ArticleSearch.vue';
import ArticleContent from './components/ArticleContent.vue';
import HomeBottom from './components/HomeBottom.vue';
import { useRoute } from 'vue-router';
import type { Menu } from '@/types';
import { searchMenu } from '@/apis';

const route = useRoute();
const menuList = ref<Menu[]>([]);
const subMenuList = ref<{ label: string; value: number }[]>([]);
const searchMenuList = async () => {
  const res = await searchMenu();
  if (res.code === 0) {
    menuList.value = res.data || [];
    resolveMenu(menuList.value);
  }
};
const resolveMenu = (menuList: Menu[]) => {
  menuList.map((menu) => {
    if (menu.children && menu.children.length > 0) {
      resolveMenu(menu.children);
    } else {
      if (menu.menuType === 'sub') subMenuList.value.push({ value: menu.id, label: menu.name });
    }
  });
};
const isHomePage = computed(() => {
  return route.name === 'home';
});
const isSubmenuPage = computed(() => {
  return route.name === 'subMenuArticleList';
});

onBeforeMount(async () => {
  await searchMenuList();
});
</script>

<style scoped lang="scss">
.home-page {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: #fff;
  .page-content {
    min-height: 600px;
  }
}
</style>
