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
  <div class="article-content flex-column">
    <div>
      <h3 class="title">
        <i><img src="" /></i>
        {{ route.query.name }}
      </h3>
      <ui>
        <template v-for="item in listData" :key="item.id">
          <li>
            <a v-on:click="chooseAricle(item.id)">{{ item.title }}</a>
            <span>{{ item.updateTime }}</span>
          </li>
        </template>
      </ui>
      <div class="article-pagination">
        <n-pagination v-model:page="pages.page" :item-count="pages.total" :page-size="pages.size" :page-slot="7" @update:page="pageChange" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { searchPage } from '@/apis';
import type { Page, PageOptions } from '@/types';
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
.article-content {
  width: 1200px;
  margin: 16px auto;
  gap: 20px;
}
.title {
  font-size: 28px;
  color: #333333;
  font-weight: bold;
  margin: 0;
  margin-bottom: 20px;
}
li {
  color: #cbb486;
  padding: 17px 0;
  text-align: justify;
  list-style-type: square;
  a {
    width: 76%;
    font-size: 16px;
    color: #000;
    margin-left: 0 !important;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
  }
  a:hover {
    color: #cbb486;
    text-decoration: none;
    cursor: pointer;
  }
  span {
    // width: 80px;
    float: right;
    opacity: 1 !important;
    color: #c4c6c7 !important;
    font-size: 14px !important;
  }
}
.article-pagination {
  width: 200px;
  margin: 16px auto;
}
</style>
