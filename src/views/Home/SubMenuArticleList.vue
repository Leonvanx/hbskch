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
  <div>
    <h3 class="title">
      <i><img src="" /></i>
      {{ route.query.name }}
    </h3>
    <ui>
      <template v-for="item in listData" :key="item.id">
        <li>
          <a v-on:click="chooseAricle(item.id)">{{ item.title }}</a>
        </li>
      </template>
    </ui>
    <template>
      <n-pagination
        v-model:page="pages.page"
        v-model:page-size="pages.size"
        :item-count="pages.total"
        show-size-picker
        :page-sizes="[10, 20, 30, 40]"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { searchPage } from '@/apis';
import type { Page } from '@/types';
const route = useRoute();
const router = useRouter();
const pages = ref({
  page: 1,
  size: 10,
  total: 0,
});
const listData = ref<Page[]>([]);
onMounted(() => {
  const menuId = Number(route.query.menuId);
  const searchWord = String(route.query.searchWord);
  searchData(menuId, searchWord);
});
const searchData = async (menuId: number, searchWord: string) => {
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
    name: 'search',
    query: {
      id: id,
    },
  });
};
</script>
<style scoped lang="scss">
@media (max-width: 480px) {
  .newsbox .hot li,
  .tadaty-list li {
    padding: 11px 0;
  }
}

@media (max-width: 480px) {
  .tadaty-list li {
    padding: 7px 0;
  }
}
</style>
