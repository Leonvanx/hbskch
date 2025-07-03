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
  <n-config-provider :theme-overrides="themeOverrides">
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
      <ArticleContent v-if="isHomePage" :carousel-articles="articleList.first" />
      <CenterSplit
        v-if="isHomePage"
        :center-page="resourceObj.centerPage"
        :jump-url="resourceObj.jumpUrl"
      ></CenterSplit>
      <FriendLink v-if="isHomePage" :posType="1" />
      <ArticleContent
        v-if="isHomePage"
        :carousel-articles="articleList.third"
        :is-row-reverse="!isMobile"
      />
      <RouterView v-if="!isHomePage" />
      <HomeBottom
        :qrCode="resourceObj.qrCode"
        :searchBt="resourceObj.searchBt"
        :text1="resourceObj.text1"
        :text2="resourceObj.text2"
        :text3="resourceObj.text3"
        :text4="resourceObj.text4"
      />
    </div>
  </n-config-provider>
</template>

<script setup lang="ts">
import HomeHeader from './components/Header.vue';
import ArticleContent from './components/ArticleContent.vue';
import HomeBottom from './components/HomeBottom.vue';
import CenterSplit from './components/CenterSplit.vue';
import FriendLink from './components/friendLink.vue';
import type { Menu, Page } from '@/types';
import { searchMenu, searchResource, searchPage } from '@/apis';
import NavMenu from './components/NavMenu.vue';
import type { GlobalThemeOverrides } from 'naive-ui';
const themeOverrides: GlobalThemeOverrides = {
  Input: {
    borderHover: '1px solid #1e80ff',
    borderFocus: '1px solid #1e80ff',
    caretColor: '#1e80ff',
    boxShadowFocus: '0 0 0 2px rgba(30,28,255,0.2)',
  },
  Pagination: {
    itemTextColorHover: '#1e80ff',
    itemTextColorActive: '#1e80ff',
    itemBorderActive: '1px solid #1e80ff',
  },
};
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
  jumpUrl: '',
  qrCode: '',
  searchBt: '',
  text1: '',
  text2: '',
  text3: '',
  text4: '',
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
      resourceObj.value.jumpUrl = res.data.filter((it) => it.code === 'jumpUrl')[0].url;
      resourceObj.value.qrCode = res.data.filter((it) => it.code === 'qrcode')[0].url;
      resourceObj.value.searchBt = res.data.filter((it) => it.code === 'searchBt')[0].url;
      resourceObj.value.text1 = res.data.filter((it) => it.code === 'text1')[0].url;
      resourceObj.value.text2 = res.data.filter((it) => it.code === 'text2')[0].url;
      resourceObj.value.text3 = res.data.filter((it) => it.code === 'text3')[0].url;
      resourceObj.value.text4 = res.data.filter((it) => it.code === 'text4')[0].url;
    }
  });
};

const articleList = ref<{
  first: Page[];
  third: Page[];
}>({
  first: [],
  third: [],
});
const getArticles = () => {
  const params = {
    page: 1,
    size: 100,
    publishStatus: 1,
    type: 1,
  };
  searchPage(params).then((res) => {
    if (res.data) {
      const first = res.data.records.filter((it) => it.showType === 1);
      const third = res.data.records.filter((it) => it.showType === 3);
      articleList.value.first = first;
      articleList.value.third = third;
    }
  });
};

onMounted(() => {
  getArticles();
  queryResources();
  searchMenuList();
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
