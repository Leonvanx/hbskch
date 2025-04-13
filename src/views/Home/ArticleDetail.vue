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
  <div class="article-content">
    <div>
      <AricleTitile :page-config="pageConfig"></AricleTitile>
      <div v-html="pageConfig.content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Page } from '@/types';
import { searchPageById } from '@/apis';
import AricleTitile from './components/AricleTitile.vue';
import { useRoute } from 'vue-router';
const pageConfig = ref<Page>({});
const route = useRoute();
watch(route, () => {
  nextTick(() => {
    setData(Number(route.query.id));
  });
});
const setData = (id: number) => {
  searchPageById(id).then((data) => {
    if (data.code === 0) {
      pageConfig.value = data.data ? data.data : {};
    } else {
    }
  });
};
onMounted(() => {
  nextTick(() => {
    setData(Number(route.query.id));
  });
});
</script>

<style scoped lang="scss">
.article-content {
  width: 1200px;
  margin: 16px auto;
  gap: 20px;
}
</style>
