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
    <div class="publish-time">{{ dayjs(articleContent.publishTime).format('YYYY-MM-DD') }}</div>

    <div ref="divRef">
      <div class="aie-container" style="border-width: 0px">
        <div class="aie-container-header" style="display: none"></div>
        <div class="aie-container-main"></div>
        <div class="aie-container-footer" style="display: none"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AiEditor } from 'aieditor';
import 'aieditor/dist/style.css';
import { useRoute } from 'vue-router';
import type { Page } from '@/types';
import { searchPageById } from '@/apis';
import dayjs from 'dayjs';
const divRef = ref<Element | null>(null);
let aiEditor: AiEditor | null = null;
const articleContent = ref<Page>({});
const route = useRoute();
const initAiEditor = () => {
  aiEditor = new AiEditor({
    element: divRef.value as Element,
    content: articleContent.value.content,
    editable: false,
  });
};
const queryArticleContent = (id: number) => {
  searchPageById(id).then((data) => {
    if (data.code === 0) {
      articleContent.value = data.data ? data.data : {};
      initAiEditor();
    }
  });
};
onMounted(() => {
  const articleId = route.query.id;
  if (articleId) {
    queryArticleContent(Number(articleId));
  }
});
watch(route, () => {
  const articleId = route.query.id;
  if (articleId) {
    queryArticleContent(Number(articleId));
  }
});
onUnmounted(() => {
  if (aiEditor) {
    aiEditor.destroy();
  }
});
</script>

<style scoped lang="scss">
.article-content {
  width: 1000px;
  margin: 36px auto;
  .title {
    font-size: 18px;
    color: #1a1a1a;
    font-weight: 600;
    // border-bottom: 1px solid #afadad;
    padding: 27px 5px;
    text-align: right;
  }
  .article-title {
    font-size: 28px;
    color: #1a1a1a;
  }
  .publish-time {
    color: #cbccce;
    font-size: 16px;
    margin-top: 10px;
  }
}
@media screen and (max-width: 1000px) {
  .article-content {
    width: 100%;
    padding: 0 26px;
  }
}
</style>
