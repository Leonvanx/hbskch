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
      <i-mdi-location></i-mdi-location>
      {{ `${route.query.searchWord || route.query.name || '文章列表'}` }}
    </div>
    <template v-if="pages.total">
      <div class="list">
        <div
          v-for="item in listData"
          :key="item.id"
          class="list-item flex-row align-center justify-between pointer posr"
        >
          <span class="article-title" @click="chooseAricle(item.id)">
            <n-highlight
              :text="item.title"
              :patterns="route.query.searchWord ? [route.query.searchWord as string] : undefined" />
            {{
          }}</span>
          <span class="release-time">{{ dayjs(item.createTime).format('YYYY-MM-DD') }}</span>
        </div>
      </div>
      <div v-if="pages.total > pages.size" class="article-pagination">
        <n-pagination
          v-model:page="pages.page"
          :item-count="pages.total"
          :page-size="pages.size"
          :page-slot="7"
          @update:page="pageChange"
        />
      </div>
    </template>
    <template v-else>
      <div class="no-data">
        <span>暂无文章</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { searchPage } from '@/apis';
import type { Page } from '@/types';
import dayjs from 'dayjs';
const route = useRoute();
const router = useRouter();
const pages = ref({
  page: 1,
  size: 10,
  total: 0,
});
const listData = ref<Page[]>([]);

const pageChange = (page: number) => {
  pages.value.page = page;
  searchData();
};
const searchData = () => {
  const searchWord = route.query.searchWord + '';
  const menuId = Number(route.query.menuId);
  const params = {
    page: pages.value.page,
    size: pages.value.size,
    menuId: menuId,
    searchWord: searchWord,
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
    name: 'articleDetail',
    query: {
      id: id,
      parentMenuName: route.query.parentMenuName,
      subMenuName: route.query.name,
    },
  });
};
onMounted(() => {
  searchData();
});
watch(route, () => {
  searchData();
});
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
  // border-bottom: 1px solid #afadad;
  padding: 27px 5px;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
}
.list {
  min-height: 400px;
  .list-item {
    padding: 27px 8px;
    gap: 16px;
    border-bottom: 1px solid #dddddd;
    align-items: baseline;
    &::before {
      content: '';
      width: 8px;
      height: 8px;
      display: block;
      position: absolute;
      background-color: #18a058;
      top: 50%;
      transform: translateY(-50%);
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
.no-data {
  height: 500px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  span {
    position: relative;
    padding-top: 80px;
    font-size: 14px;
    color: #999;
    &::after {
      width: 60px;
      height: 60px;
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      background: url('@/assets/icons/empty.svg') no-repeat;
      background-size: 100%;
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
