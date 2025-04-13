<!--
  功能：子菜单文章列表页
  作者：xulf
  邮箱：lvin_xu@outlook.com
  时间：2025年04月13日 14:47:32
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div class="article-list flex-column">
    <div class="title">
      {{ route.query.name }}
    </div>
    <div class="list">
      <div v-for="item in listData" :key="item.id" class="list-item flex-row align-center justify-between pointer posr">
        <span class="article-title" @click="chooseAricle(item.id)">{{ item.title }}</span>
        <span class="release-time">{{ dayjs(item.createTime).format('YYYY-MM-DD') }}</span>
      </div>
    </div>
    <div class="article-pagination">
      <n-pagination v-model:page="pages.page" :item-count="pages.total" :page-size="pages.size" :page-slot="7" @update:page="pageChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { searchPage } from '@/apis';
import type { Page, PageOptions } from '@/types';
import dayjs from 'dayjs';
const route = useRoute();
const router = useRouter();
const searchOption = ref<PageOptions>({});
const pages = ref({
  page: 1,
  size: 10,
  total: 0,
});
const listData = ref<Page[]>([]);
onMounted(() => {
  searchOption.value.menuId = Number(route.query.menuId);
  searchOption.value.searchWord = String(route.query.searchWord);
  searchData();
});
watch(route, () => {
  searchOption.value.menuId = Number(route.query.menuId);
  searchOption.value.searchWord = String(route.query.searchWord);
  searchData();
});
const pageChange = (page: number) => {
  pages.value.page = page;
  searchData();
};
const searchData = () => {
  const params = {
    page: pages.value.page,
    size: pages.value.size,
    menuId: searchOption.value.menuId,
    searchWord: searchOption.value.searchWord,
  };
  searchPage(params).then((data) => {
    if (data.code === 0) {
      listData.value = data.data ? data.data.records : [];
      pages.value.total = data.data ? data.data.total! : 0;
    }
  });
};
const chooseAricle = (id?: number) => {
  router.push({
    name: 'ArticleDetail',
    query: {
      id: id,
    },
  });
};
</script>
<style scoped lang="scss">
.article-list {
  width: 1200px;
  margin: 16px auto;
}
.title {
  font-size: 18px;
  color: #1a1a1a;
  font-weight: 600;
  &::after {
    content: '';
    display: block;
    width: 50px;
    height: 8px;
    background: linear-gradient(90deg, rgb(24, 160, 82) 0%, rgba(24, 160, 82, 0.05) 100%);
    border-radius: 4px 4px 4px 4px;
    position: relative;
    top: -10px;
  }
}
.list {
  margin-top: 20px;
  .list-item {
    padding: 16px 0;
    gap: 16px;
    align-items: baseline;
    &::before {
      content: '';
      width: 8px;
      height: 8px;
      display: block;
      position: absolute;
      background-color: #18a058;
      top: 21px;
    }
    .article-title {
      color: #1a1a1a;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      margin-left: 15px;
      &:hover {
        font-weight: 500;
        color: #18a058;
      }
    }
    .release-time {
      font-size: 12px;
      color: #999;
      flex-shrink: 0;
    }
  }
}

.article-pagination {
  margin: 16px auto;
}

@media screen and (max-width: 1200px) {
  .article-list {
    width: 100%;
    padding: 0 20px;
  }
}
</style>
