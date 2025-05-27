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
  <div class="home-top-header flex-row justify-between">
    <div class="container flex-row align-center">
      <span class="nowTime">{{ nowTime }}</span>
      <iframe
        v-if="!isMobile"
        class="tianq"
        width="200"
        height="26"
        frameborder="0"
        scrolling="no"
        src="https://i.tianqi.com/index.php?c=code&amp;id=26&amp;icon=1&amp;num=3"
        allowtransparency="true"
      ></iframe>
      <!-- 搜索 -->
      <span style="flex: 1"></span>
    </div>
    <n-input
      ref="target"
      v-model:value="searchValue"
      round
      class="search-input"
      size="large"
      placeholder="请输入关键字"
      @keydown.enter="searchArticle()"
    >
      <template #suffix>
        <i-mdi-search
          class="pointer"
          style="font-size: 1rem; margin-left: 8px"
          @click="searchArticle()"
        />
        <!-- <span class="search-suffix-btn" @click="searchArticle()">搜一下</span> -->
      </template>
    </n-input>
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
    <n-marquee v-if="isMobile" class="web-desc isMobile">
      {{ props.webDesc }}
    </n-marquee>
    <div v-else class="web-desc">
      <CTextRoll :speed="10" direction="up">
        {{ props.webDesc }}
      </CTextRoll>
    </div>
  </div>
</template>

<script setup lang="ts">
import headerIcon from '@/assets/icons/science-color.svg';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
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
const nowTime = computed(() => {
  return '现在是' + dayjs().format('YYYY年MM月DD日 星期dd');
});
const searchValue = ref('');
const searchArticle = () => {
  router.push({
    name: 'subMenuArticleList',
    query: {
      meunId: 0,
      searchWord: searchValue.value,
    },
  });
};
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
  padding: 5px 60px;
  .nowTime {
    font-size: 14px;
    margin-right: 10px;
  }
  .search-input {
    width: 260px;
    :deep(.n-input__input-el) {
      height: 100%;
      line-height: 100%;
    }
    // .search-suffix-btn {
    //   cursor: pointer;
    //   color: #fff;
    // }

    // :deep(.n-input__placeholder) {
    //   color: #fff;
    // }

    // :deep(.n-input__input-el) {
    //   color: #fff;
    // }
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
      font-size: clamp(18px, 4vw, 72px);
    }

    .web-title-en {
      color: #dddddd;
      font-weight: 400;
    }

    @media (max-width: 768px) {
      .web-title-cn {
      }

      .web-title-en {
        font-size: 14px;
      }
    }

    @media (max-width: 768px) {
      .web-title-cn {
      }

      .web-title-en {
        font-size: 10px;
      }
    }
  }

  .web-desc {
    margin-left: auto;
    width: 400px;
    flex-shrink: 0;
    color: #f2f2f2;
    height: 80px;
    border: 1px dotted #f2f2f230;
    border-radius: 3px;
    padding: 5px;
    &.isMobile {
      margin-left: 20px;
      margin-right: 20px;
      max-width: calc(100% - 40px);
      height: 30px;
      position: absolute;
      left: 0px;
      bottom: 0px;
    }
  }
}
@media (max-width: 768px) {
  .home-top-header {
    padding: 5px 30px;
  }
  .web-desc {
    width: 100%;
    height: 30px;
  }
}
@media (max-width: 480px) {
  .home-top-header {
    padding: 5px 10px;
    .nowTime {
      font-size: 12px;
    }
  }
  .home-top-header .search-input {
    width: 150px;
  }
}
</style>
