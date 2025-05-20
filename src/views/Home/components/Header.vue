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
  <div class="home-top-header">
    <div class="container">
      <iframe
        width="280"
        height="26"
        frameborder="0"
        scrolling="no"
        src="https://i.tianqi.com/index.php?c=code&amp;id=26&amp;icon=1&amp;num=3"
        allowtransparency="true"
      ></iframe>
      <!-- 搜索 -->
      <span style="flex: 1"></span>
      <n-input size="small" style="width: 150px" placeholder="请输入关键字"></n-input>
    </div>
  </div>
  <div
    class="home-header flex-row align-center posr"
    :style="{ backgroundImage: props.bgImg ? `url(${props.bgImg})` : '' }"
  >
    <img class="logo pointer" :src="props.webLogo" alt="" @click="goHome" />
    <div class="web-title flex-column justify-center">
      <h1 class="web-title-cn">{{ props.webTitle }}</h1>
      <div class="web-title-en">{{ props.webTitleEn }}</div>
    </div>
    <span style="flex: 1"></span>
    <CTextRoll
      v-if="isMobile && props.webDesc"
      class="text-roll"
      :text="props.webDesc"
      :speed="15"
      color="#f2f2f2"
    />
    <div v-else class="web-desc">
      <CTextRoll
        direction="vertical"
        class="text-roll"
        :text="props.webDesc"
        :speed="15"
        color="#f2f2f2"
        show-height="100%"
      />
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
  bgImg?: string;
  webDesc?: string;
  isMobile?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  webTitle: '湖北省科技进步促进会',
  webTitleEn: 'Hubei Association for Promoting the Progress of Science and Technology',
  webLogo: headerIcon,
  bgImg: '',
  webDesc: '',
});

const goHome = () => {
  router.replace({
    name: 'home',
  });
};
</script>

<style scoped lang="scss">
.home-top-header {
  width: 100%;
  height: 35px;
  background-color: #f1f1f1;
  flex-shrink: 0;
  .container {
    margin-right: auto;
    margin-left: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 15px;
  }
}
.home-header {
  padding: 50px 60px 70px;
  background-color: #fff;
  z-index: 1;
  // background-size: cover;
  background-size: 100% 100%;
  @media (max-width: 768px) {
    padding: 16px 20px 40px;
  }
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
        font-size: clamp(14px, 3vw, 72px);
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
    margin-top: 20px;
    color: #f2f2f2;
    width: 350px;
    position: relative;
    height: 80px;
    padding: 5px;
    border: 1px dotted #f2f2f230;
    border-radius: 3px;
  }
  .text-roll {
    position: absolute;
    bottom: 0px;
    color: #f2f2f2;
  }
}
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}
</style>
