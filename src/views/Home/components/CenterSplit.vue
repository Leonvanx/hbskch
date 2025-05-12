<!--
  功能：中间窗帘
  作者：disonlv
  邮箱：disonlv@outlook.com
  时间：2025年05月09日 15:12:36
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div class="center-split-line">
    <img style="width: 100%; height: 100%; object-fit: cover" :src="props.centerPage" alt="" />
  </div>
</template>

<script setup lang="ts">
type Props = {
  centerPage: string;
};
const props = withDefaults(defineProps<Props>(), {});
</script>

<style scoped lang="scss">
.center-split-line {
  margin: 0 auto;
  max-width: 1200px;
  max-height: 200px;
}
</style>
