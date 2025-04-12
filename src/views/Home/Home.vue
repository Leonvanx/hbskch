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
  <n-space vertical size="large">
    <n-layout>
      <n-layout-header>
        <NButton v-on:click="getContent(6)">1</NButton>
        <NButton v-on:click="getContent(7)">2</NButton>
      </n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        <ChildPage :id="contentId"></ChildPage>
      </n-layout-content>
      <n-layout-footer>成府路</n-layout-footer>
    </n-layout>
  </n-space>
</template>

<script setup lang="ts">
const contentId = ref<number>(9);
const getContent = (id: number) => {
  console.log();
  contentId.value = id;
};
</script>

<style scoped lang="scss"></style>
