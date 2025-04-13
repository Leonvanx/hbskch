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
    <img class="logo" :src="props.webLogo" alt="" />
    <div class="web-title flex-column justify-center">
      <div class="web-title-cn">{{ props.webTitle }}</div>
      <div class="web-title-en">{{ props.webTitleEn }}</div>
    </div>
    <div v-if="isShowLogin" class="login-btn" @click="emit('login')">登录</div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  webTitle?: string;
  webTitleEn?: string;
  webLogo?: string;
  isShowLogin?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  webTitle: '湖北省科技进步促进会',
  webTitleEn: 'Hubei Science and Technology Progress Association',
  webLogo: '/src/assets/icons/science-color.svg',
  isShowLogin: true,
});

const emit = defineEmits(['login']);
</script>

<style scoped lang="scss">
.home-header {
  box-sizing: content-box;
  height: 60px;
  padding: 14px 20px;
  .logo {
    height: 100%;
    width: auto;
  }
  .web-title {
    margin-left: 10px;
    gap: 6px;
    .web-title {
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

  .login-btn {
    margin-left: auto;
    border: 1px solid #18a058;
    border-radius: 15px;
    padding: 4px 12px;
    font-size: 14px;
    color: #18a058;
    cursor: pointer;
  }
}
</style>
