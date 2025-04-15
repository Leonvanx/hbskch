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
  <div class="article-content flex-row">
    <div class="main-article flex-column ovf">
      <n-carousel show-arrow autoplay>
        <div v-for="item in top3Article" :key="item.id" class="article-item posr">
          <img class="carousel-img" :src="item.coverImage" />
          <div class="article-title-wrapper">
            <span class="article-title pointer" @click="clickArticle(item.id)">
              {{ item.title }}
            </span>
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
    <div class="article-list ovf">
      <div
        v-for="item in rightArticleList"
        :key="item.id"
        class="article-list-item flex-row align-center ovf justify-between pointer"
        @click="clickArticle(item.id)"
      >
        <div class="article-title els">
          {{ item.title }}
        </div>
        <div class="release-time">{{ dayjs(item.createTime).format('YYYY-MM-DD') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { searchPage } from '@/apis';
import type { Menu, Page } from '@/types';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
type Props = {
  menuList: Menu[];
  subMenuId?: number;
};
const router = useRouter();
const props = defineProps<Props>();

const articleList = ref<Page[]>([]);
const top3Article = ref<Page[]>([]);
const rightArticleList = ref<Page[]>([]);
const clickArticle = (id?: number) => {
  router.push({
    name: 'articleDetail',
    query: {
      id: id,
    },
  });
};
const getArticleList = () => {
  const params = {
    page: 1,
    size: 10,
    menuId: props.subMenuId || props.menuList?.[1]?.children?.[0]?.id,
    summary: 1,
  };
  searchPage(params).then((res) => {
    if (res.code === 0) {
      articleList.value = res.data?.records || [];
      if (articleList.value.length) {
        top3Article.value = articleList.value.slice(0, 3);
        rightArticleList.value = articleList.value.slice(3);
      }
    }
  });
};
watch(
  () => [props.subMenuId, props.menuList],
  () => {
    getArticleList();
  },
  { immediate: true },
);
onMounted(() => {});
</script>

<style scoped lang="scss">
.article-content {
  width: 1200px;
  gap: 20px;
  margin: 20px auto 0;
  padding-bottom: 20px;
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
      width: 300px;
      background-color: #fff;
      padding: 12px 16px;
      position: absolute;
      min-height: 90px;
      left: 12px;
      bottom: 12px;

      .article-title {
        font-size: 14px;
        font-weight: 600;
        margin-top: 6px;
        color: #18a058;
      }
      .article-title:hover {
        text-decoration: underline;
      }
    }

    .carousel-img {
      width: 100%;
      height: 400px;
      object-fit: cover;
    }
  }
}

.article-list {
  flex: 1;

  .article-list-item {
    gap: 16px;
    border-bottom: 1px solid #e5e5e5;

    &:hover {
      .article-title {
        color: #18a058;
      }
    }

    .article-title {
      padding: 14px 0;
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

.custom-dots {
  display: flex;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 20px;
  left: 24px;

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
      background: #18a058;
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
