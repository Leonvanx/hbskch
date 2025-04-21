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
    <img class="logo pointer" :src="props.webLogo" alt="" @click="goHome" />
    <div class="web-title flex-column justify-center">
      <div class="web-title-cn">{{ props.webTitle }}</div>
      <div class="web-title-en">{{ props.webTitleEn }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import headerIcon from '@/assets/icons/science-color.svg';
const router = useRouter();
type Props = {
  webTitle?: string;
  webTitleEn?: string;
  webLogo?: string;
};
const props = withDefaults(defineProps<Props>(), {
  webTitle: '湖北省科技进步促进会',
  webTitleEn: 'Hubei Association for Promoting the Progress of Science and Technology',
  webLogo: headerIcon,
});
const goHome = () => {
  router.replace({
    name: 'home',
  });
};
</script>

<style scoped lang="scss">
.home-header {
  padding: 20px 60px;
  background-color: #fff;
  z-index: 1;
  // background-color: rgba(0, 0, 0, 0.8);
  .logo {
    height: 60px;
    width: auto;
  }
  .web-title {
    margin-left: 30px;
    .web-title-cn {
      font-size: 36px;
      color: #333333;
      font-weight: 800;
    }
    .web-title-en {
      font-size: 14px;
      color: #999999;
      font-weight: 400;
    }
  }
}
@media (max-width: 768px) {
  .home-header .left .web-title .web-title-cn {
    font-size: 16px;
  }
  .home-header.left.web-title.web-title-en {
    font-size: 10px;
  }
}
</style>
