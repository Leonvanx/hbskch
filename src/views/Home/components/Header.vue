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
  <div
    class="home-header flex-row align-center"
    :style="{ backgroundImage: props.bgImg ? `url(${props.bgImg})` : '' }"
  >
    <img class="logo pointer" :src="props.webLogo" alt="" @click="goHome" />
    <div class="web-title flex-column justify-center">
      <h1 class="web-title-cn">{{ props.webTitle }}</h1>
      <div class="web-title-en">{{ props.webTitleEn }}</div>
    </div>
    <div class="web-desc">{{ props.webDesc }}</div>
  </div>
</template>

<script setup lang="ts">
import headerIcon from '@/assets/icons/science-color.svg';
const router = useRouter();
type Props = {
  webTitle?: string;
  webTitleEn?: string;
  webLogo?: string;
  bgImg?: string;
  webDesc?: string;
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
  padding: 50px 60px 70px;
  background-color: #fff;
  z-index: 1;
  background-size: cover;

  // background-color: rgba(0, 0, 0, 0.8);
  .logo {
    height: 60px;
    width: auto;
  }

  .web-title {
    margin-left: 30px;

    .web-title-cn {
      white-space: nowrap;
      color: #ffffff;
      font-weight: 800;
    }

    .web-title-en {
      color: #dddddd;
      font-weight: 400;
    }

    @media (min-width: 768px) {
      .web-title-cn {
        font-size: 40px;
      }

      .web-title-en {
        font-size: 14px;
      }
    }

    @media (max-width: 768px) {
      .web-title-cn {
        font-size: 16px;
      }

      .web-title-en {
        font-size: 10px;
      }
    }
  }

  .web-desc {
    margin-left: 20px;
    color: #333333;

    @media (min-width: 768px) {
      font-size: 18px;
    }

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
}
</style>
