<!--
  功能：子文章页面
  作者：renzj
  邮箱：591738878@qq.com
  时间：2025年04月08日 22:47:14
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div class="article-content flex-column">
    <div class="article-title">{{ articleContent.title }}</div>
    <div class="publish-time">{{ dayjs(articleContent.createTime).format('YYYY-MM-DD') }}</div>
    <div class="rich-text" v-html="articleContent.content"></div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import type { Page } from '@/types';
import { searchPageById } from '@/apis';
import dayjs from 'dayjs';
const articleContent = ref<Page>({});
const route = useRoute();

const queryArticleContent = (id: number) => {
  searchPageById(id).then((data) => {
    if (data.code === 0) {
      articleContent.value = data.data ? data.data : {};
      nextTick(() => {
        const imgs = document.querySelectorAll('.rich-text img');
        imgs.forEach((img) => {
          (img as HTMLImageElement).style.maxWidth = '100%';
          (img as HTMLImageElement).style.height = 'auto';
        });
      });
    }
  });
};
onMounted(() => {
  const articleId = route.query.id;
  if (articleId) {
    queryArticleContent(Number(articleId));
  }
});
</script>

<style scoped lang="scss">
.article-content {
  width: 1000px;
  margin: 36px auto;
  .article-title {
    font-size: 28px;
    color: #1a1a1a;
  }
  .publish-time {
    color: #cbccce;
    font-size: 16px;
    margin-top: 10px;
  }
  .rich-text {
    margin-top: 26px;
    img {
      max-width: 100%;
    }
  }
}
@media screen and (max-width: 1000px) {
  .article-content {
    width: 100%;
    padding: 0 26px;
  }
}

@media screen and (max-width: 768px) {
  .rich-text {
    img {
      max-width: 100% !important;
      height: auto !important;
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
