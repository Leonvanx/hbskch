<!--
  功能：首页顶部栏
  作者：xulf
  邮箱：lvin_xu@outlook.com
  时间：2025年04月12日 15:14:10
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div class="home-header flex-row align-center">
    <div class="left flex-row align-center">
      <img class="logo" :src="props.webLogo" alt="" />
      <div class="web-title flex-column justify-center">
        <div class="web-title-cn">{{ props.webTitle }}</div>
        <div class="web-title-en">{{ props.webTitleEn }}</div>
      </div>
    </div>
    <NavMenu class="flex1" />
  </div>
</template>

<script setup lang="ts">
import headerIcon from '@/assets/icons/science-color.svg';
import NavMenu from './NavMenu.vue';
type Props = {
  webTitle?: string;
  webTitleEn?: string;
  webLogo?: string;
};
const props = withDefaults(defineProps<Props>(), {
  webTitle: '湖北省科技进步促进会',
  webTitleEn: 'Hubei Science and Technology Progress Association',
  webLogo: headerIcon,
});
</script>

<style scoped lang="scss">
.home-header {
  height: 80px;
  padding: 14px 20px;
  background-color: #fff;
  z-index: 1;
  // background-color: rgba(0, 0, 0, 0.8);
  .left {
    height: 100%;
    flex-shrink: 0;
    .logo {
      height: 100%;
      width: auto;
    }
    .web-title {
      margin-left: 10px;
      gap: 6px;
      .web-title-cn {
        font-size: 20px;
        color: #333333;
        font-weight: 600;
      }
      .web-title-en {
        font-size: 12px;
        color: #999999;
        font-weight: 400;
      }
    }
  }
}
</style>
