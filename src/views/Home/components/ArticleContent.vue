<!--
  功能：文章内容
  作者：xulf
  邮箱：lvin_xu@outlook.com
  时间：2025年04月12日 23:28:02
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div class="article-content flex-row" :class="{ 'reverse-row': props.isRowReverse }">
    <div v-if="carouselArticles.length > 0" class="main-article flex-column ovf">
      <n-carousel show-arrow autoplay>
        <div
          v-for="item in carouselArticles"
          :key="item.id"
          class="article-item posr pointer"
          @click="clickArticle(item.id)"
        >
          <img class="carousel-img" :src="item.coverImage" />
          <div class="article-title-wrapper">
            <div class="article-title">
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
        <template #dots="{ total, currentIndex, to }">
          <ul class="custom-dots">
            <li
              v-for="index of total"
              :key="index"
              :class="{ ['is-active']: currentIndex === index - 1 }"
              @click="to(index - 1)"
            />
          </ul>
        </template>
      </n-carousel>
    </div>
    <div v-if="rightArticles.length > 0" class="article-list-container flex-column ovf">
      <!-- 新增横向tab -->
      <n-tabs
        type="line"
        pane-wrapper-class="article-list-tabs"
        default-value="latest"
        trigger="hover"
        @update-value="tabChange"
      >
        <n-tab name="latest" tab="最新文章"></n-tab>
        <n-tab name="hot" tab="热门文章"></n-tab>
        <n-tab name="recommend" tab="推荐文章"></n-tab>
      </n-tabs>
      <div class="article-list">
        <!-- 原有内容 -->
        <div
          v-for="item in rightArticles"
          :key="item.id"
          class="article-list-item flex-row align-center ovf justify-between pointer"
          @click="clickArticle(item.id)"
        >
          <div class="article-title els">
            <span>{{ item.title }}</span>
          </div>
          <div class="release-time">{{ dayjs(item.publishTime).format('YYYY-MM-DD') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Page } from '@/types';
import dayjs from 'dayjs';
type Props = {
  isRowReverse?: boolean;
  carouselArticles: Page[];
  rightArticles: Page[];
};
const router = useRouter();
const props = defineProps<Props>();

const clickArticle = (id?: number) => {
  router.push({
    name: 'articleDetail',
    query: {
      id: id,
    },
  });
};

const activeTab = ref('');
const tabChange = (val: string) => {
  activeTab.value = val;
};
onMounted(() => {});
</script>

<style scoped lang="scss">
.article-content {
  width: 1200px;
  gap: 40px;
  margin: 40px auto;
  padding-bottom: 20px;

  &.reverse-row {
    flex-direction: row-reverse;
  }
}

.main-article {
  width: 650px;
  flex-shrink: 0;

  .sub-menu-title {
    font-size: 18px;
    height: 20px;
    line-height: 20px;
    font-weight: 600;
    color: #18a058;
    padding-left: 5px;
    margin-bottom: 10px;
    position: relative;

    &::before {
      position: absolute;
      left: 0;
      content: '';
      display: block;
      width: 3px;
      height: 20px;
      border-radius: 3px;
      background-color: #18a058;
    }
  }

  .article-item {
    .article-title-wrapper {
      width: 100%;
      height: 50px;
      background-color: #38383875;
      padding: 10px 5% 12px 5%;
      position: absolute;
      // left: 12px;
      bottom: 0px;
      transition: all 0.3s;
      /* 显示省略号 */
      .article-title {
        width: 500px;
        white-space: nowrap;
        /* 防止文本换行 */
        overflow: hidden;
        /* 隐藏溢出的文本 */
        text-overflow: ellipsis;
        font-size: 14px;
        font-weight: 600;
        color: #f7f7f7;
      }

      .article-title:hover {
        // text-decoration: underline;
      }
    }

    .carousel-img {
      width: 100%;
      height: 382px;
      object-fit: cover;
      transition: all 0.3s;

      &:hover {
        transform: scale(1.1);
      }
    }

    &:hover {
      .article-title-wrapper {
        // background-color: #ffffff;
      }
    }
  }
}

.article-list-container {
  flex: 1;
  padding: 3px;
  height: 382px;
  .article-list-tabs {
    overflow-x: auto;
    white-space: nowrap;
  }
  :deep(.n-tabs-tab__label) {
    font-size: 16px;
    font-weight: 600;
    color: #1f4d83;
  }
  :deep(.n-tabs-bar) {
    background-color: #1f4d83;
  }
  :deep(.n-tabs-bar) {
    bottom: 0px;
  }
  .article-list {
    margin-top: 12px;
    overflow-y: auto;
    flex: 1;
    .article-list-item {
      gap: 16px;
      padding: 0 15px;
      border-bottom: 1px solid #eeeeee;
      position: relative;
      &::before {
        width: 5px;
        height: 5px;
        position: absolute;
        left: 0;
        content: '';
        display: block;
        background-color: #1e80ff;
        top: 50%;
        transform: translateY(-50%);
      }
      &:hover {
        .article-title {
          color: #ff3401;
        }
      }

      .article-title {
        padding: 11px 0;
        color: #1a1a1a;
        font-size: 16px;
      }

      .release-time {
        font-size: 12px;
        color: #999;
        flex-shrink: 0;
      }
    }
  }
}

.custom-dots {
  display: flex;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 10px;
  left: 32.5px;

  li {
    display: inline-block;
    width: 12px;
    height: 4px;
    margin: 0 3px;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5);
    transition:
      width 0.3s,
      background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;

    &.is-active {
      width: 40px;
      background: #ffffff;
    }
  }
}

@media (max-width: 1200px) {
  .article-content {
    width: 100%;
    padding: 0 20px 20px;
  }
}

@media (max-width: 1100px) {
  .main-article {
    width: 550px;
  }
}

@media (max-width: 900px) {
  .main-article {
    width: 500px;
  }
}

@media (max-width: 800px) {
  .main-article {
    width: 100%;
  }

  .article-content {
    display: flex;
    flex-direction: column;
  }
}

@media (max-width: 430px) {
  .main-article .article-item .carousel-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
}
</style>

<style scoped>
/* 新增tab样式 */
.article-list :deep(.n-tabs) {
  margin-bottom: 16px;
}

.article-list :deep(.n-tabs-nav) {
  border-bottom: 1px solid #f0f0f0;
}
</style>
