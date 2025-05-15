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
    <HomeHeader
      :webTitle="resourceObj.webTitle"
      :web-title-en="resourceObj.webTitleEn"
      :web-logo="resourceObj.webLogo"
      :web-desc="resourceObj.webDesc"
      :bg-img="resourceObj.bgImg"
      :isMobile="isMobile"
    />
    <NavMenu />
    <ArticleContent
      v-if="isHomePage"
      :carousel-articles="articleList.first"
      :right-articles="articleList.second"
    />
    <CenterSplit v-if="isHomePage" :center-page="resourceObj.centerPage"></CenterSplit>
    <ArticleContent
      v-if="isHomePage"
      :carousel-articles="articleList.third"
      :right-articles="articleList.fourth"
      :is-row-reverse="!isMobile"
    />
    <RouterView v-if="!isHomePage" />
    <HomeBottom />
  </div>
</template>

<script setup lang="ts">
import HomeHeader from './components/Header.vue';
import ArticleContent from './components/ArticleContent.vue';
import HomeBottom from './components/HomeBottom.vue';
import CenterSplit from './components/CenterSplit.vue';
import { useRoute } from 'vue-router';
import type { Menu, Page } from '@/types';
import { searchMenu, searchResource, searchPage } from '@/apis';
import NavMenu from './components/NavMenu.vue';

const route = useRoute();
const menuList = ref<Menu[]>([]);
const searchMenuList = async () => {
  const res = await searchMenu();
  if (res.code === 0) {
    menuList.value = res.data || [];
  }
};

const { width } = useWindowSize();
const isMobile = computed(() => {
  const userAgent = navigator.userAgent;
  const mobileAgents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  for (let i = 0; i < mobileAgents.length; i++) {
    if (userAgent.indexOf(mobileAgents[i]) > -1) {
      return true;
    }
  }
  return width.value < 768;
});

const isHomePage = computed(() => {
  return route.name === 'home';
});
const resourceObj = ref({
  webTitle: '',
  webTitleEn: '',
  webLogo: '',
  bgImg: '',
  webDesc: '',
  centerPage: '',
});

const queryResources = () => {
  searchResource().then((res) => {
    if (res.data) {
      resourceObj.value.webTitle = res.data.filter((it) => it.code === 'zhTitle')[0].url;
      resourceObj.value.webTitleEn = res.data.filter((it) => it.code === 'enTitle')[0].url;
      resourceObj.value.webLogo = res.data.filter((it) => it.code === 'logo')[0].url;
      resourceObj.value.bgImg = res.data.filter((it) => it.code === 'topbg')[0].url;
      resourceObj.value.webDesc = res.data.filter((it) => it.code === 'desc')[0].url;
      resourceObj.value.centerPage = res.data.filter((it) => it.code === 'searchH5')[0].url;
    }
  });
};

const articleList = ref<{
  first: Page[];
  second: Page[];
  third: Page[];
  fourth: Page[];
}>({
  first: [],
  second: [],
  third: [],
  fourth: [],
});
const getArticles = () => {
  const params = {
    page: 1,
    size: 100,
    summary: 1,
  };
  searchPage(params).then((res) => {
    if (res.data) {
      articleList.value.first = res.data.records.filter((it) => it.showType === 1);
      articleList.value.second = res.data.records.filter((it) => it.showType === 2);
      articleList.value.third = res.data.records.filter((it) => it.showType === 3);
      articleList.value.fourth = res.data.records.filter((it) => it.showType === 4);
    }
  });
};

onBeforeMount(async () => {
  getArticles();
  queryResources();
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
