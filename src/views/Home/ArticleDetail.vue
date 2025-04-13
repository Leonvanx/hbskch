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
  <div v-html="pageConfig.content"></div>
</template>

<script setup lang="ts">
import type { Page } from '@/types';
import { searchPageById } from '@/apis';
type Props = {
  id: number;
};
const props = defineProps<Props>();
const pageConfig = ref<Page>({
  content: '<p>欢迎登录首页</p>',
});
const myComputed = computed(() => {
  return props.id;
});
watch(myComputed, (newVal) => {
  nextTick(() => {
    setData(newVal);
  });
});
const setData = (id: number) => {
  searchPageById(id).then((data) => {
    if (data.code === 0) {
      pageConfig.value.content = data.data?.content;
    } else {
    }
  });
};
onMounted(() => {
  nextTick(() => {
    setData(props.id);
  });
});
</script>

<style scoped lang="scss"></style>
