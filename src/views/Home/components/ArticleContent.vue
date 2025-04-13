<!--
  功能：文章内容
  作者：xulf
  邮箱：lvin_xu@outlook.com
  时间：2025年04月12日 23:28:02
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div class="article-content flex-row">
    <div class="main-article flex-column ovf">
      <template v-if="firstArticle">
        <div class="sub-menu-title">{{ props.menuList[1].name }}</div>
        <n-image lazy width="650" :src="firstArticle.coverImage" />
        <div class="article-title els">{{ firstArticle.title }}</div>
        <div class="article-text-content">{{ firstArticle.content }}</div>
      </template>
    </div>
    <div class="article-list"></div>
  </div>
</template>

<script setup lang="ts">
import { searchPage } from '@/apis';
import type { Menu, Page } from '@/types';
type Props = {
  menuList: Menu[];
  subMenuId?: number;
};
const props = defineProps<Props>();

const firstArticle = ref<Page | null>(null);
const articleList = ref<Page[]>([]);

const getArticleList = () => {
  const params = {
    page: 1,
    size: 10,
    menuId: props.subMenuId || props.menuList[1].children[0].id,
  };
  searchPage(params).then((res) => {
    if (res.code === 0) {
      articleList.value = res.data?.records || [];
      if (articleList.value.length) {
        firstArticle.value = articleList.value[0];
      }
    }
  });
};
watch(
  () => [props.subMenuId, props.menuList],
  () => {
    getArticleList();
  },
);
onMounted(() => {});
</script>

<style scoped lang="scss">
.article-content {
  width: 1200px;
  margin: 16px auto;
  gap: 20px;
}
.main-article {
  width: 650px;
  .sub-menu-title {
    width: 100px;
    font-size: 18px;
    height: 20px;
    line-height: 20px;
    font-weight: 600;
    color: #18a058;
    padding-left: 5px;
    margin-bottom: 10px;
    position: relative;
    &::before {
      position: absolute;
      left: 0;
      content: '';
      display: block;
      width: 3px;
      height: 20px;
      border-radius: 3px;
      background-color: #18a058;
    }
  }
  .article-title {
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    margin-top: 6px;
    color: #18a058;
  }
  .article-text-content {
    cursor: pointer;
    margin-top: 12px;
    height: 40px;
    text-indent: 2em;
    font-size: 12px;
    color: #878787;
  }
}
.article-list {
  flex: 1;
}
</style>
