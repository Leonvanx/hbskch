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
    <NavMenu :menu-list="menuList" />
    <ArticleSearch />
    <template v-if="route.path === '/home'">
      <ArticleContent :menu-list="menuList" />
    </template>
    <template v-else>
      <RouterView />
    </template>
    <HomeBottom />
  </div>
</template>

<script setup lang="ts">
import HomeHeader from './components/Header.vue';
import NavMenu from './components/NavMenu.vue';
import ArticleSearch from './components/ArticleSearch.vue';
import ArticleContent from './components/ArticleContent.vue';
import HomeBottom from './components/HomeBottom.vue';
import { useRoute } from 'vue-router';
import type { Menu } from '@/types';
import { searchMenu } from '@/apis';

const route = useRoute();
const menuList = ref<Menu[]>([]);
const searchMenuList = async () => {
  const res = await searchMenu();
  if (res.code === 0) {
    menuList.value = res.data || [];
  }
};
onMounted(() => {
  searchMenuList();
});
</script>

<style scoped lang="scss">
.home-page {
  width: 100%;
  height: 100%;
  overflow-y: auto;

  .page-content {
    min-height: 600px;
  }
}
</style>
