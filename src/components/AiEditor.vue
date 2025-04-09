<!--
  功能：子页面富文本编辑
  作者：renzj
  邮箱：591738878@qq.com
  时间：2025年04月08日 22:34:00
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div ref="divRef" style="height: 600px" />
</template>

<script setup lang="ts">
import { AiEditor } from 'aieditor';
import 'aieditor/dist/style.css';
const divRef = ref<Element | null>(null);
let aiEditor: AiEditor | null = null;

onMounted(() => {
  aiEditor = new AiEditor({
    element: divRef.value as Element,
    placeholder: '点击输入内容...',
    content: 'AiEditor 是一个面向 AI 的开源富文本编辑器。 ',
  });
});
onUnmounted(() => {
  if (aiEditor) {
    aiEditor.destroy();
  }
});
</script>

<style scoped lang="scss"></style>
