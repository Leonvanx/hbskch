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
  <div class="Aricle-title">
    <h2 class="cconTitle">{{ props.pageConfig.title }}</h2>
    <div class="wData">发布时间： {{ props.pageConfig.updateTime }}</div>
  </div>
</template>

<script setup lang="ts">
import type { Page } from '@/types';
type Props = {
  pageConfig: Page;
};
const props = defineProps<Props>();
onMounted(() => {});
</script>

<style scoped lang="scss">
.Aricle-title {
  width: 100%;
}
.cconTitle {
  font-size: 18px;
  color: #444;
  padding: 30px 0 15px 0;
  text-align: center;
}
.wData {
  padding-bottom: 20px;
  border-bottom: 1px solid #ebebeb;
  text-align: center;
}
</style>
