<!--
  功能：搜索组件
  作者：xulf
  邮箱：lvin_xu@outlook.com
  时间：2025年04月12日 19:28:08
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div class="search-input-bg flex-column" :style="{ backgroundImage: `url(${searchPC})` }">
    <div class="flex1 flex-center search-input-wrapper">
      <n-input
        v-model:value="searchValue"
        class="search-input"
        size="large"
        placeholder="找不到你想了解的内容？"
        @keydown.enter="searchArticle()"
      >
        <template #suffix>
          <span class="search-suffix-btn" @click="searchArticle()">搜一下</span>
        </template>
      </n-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { searchResource } from '@/apis/admin';

const searchPC = ref('');
const searchH5 = ref('');
const searchPCImg = async () => {
  const res = await searchResource('searchPC');
  if (res.code === 0) {
    searchPC.value = res.data?.[0]?.url || '';
  }
};
const searchH5Img = async () => {
  const res = await searchResource('searchH5');
  if (res.code === 0) {
    searchH5.value = res.data?.[0]?.url || '';
  }
};
const router = useRouter();
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
searchPCImg();
searchH5Img();
</script>
<style></style>
<style scoped lang="scss">
.search-input-bg {
  width: 100%;
  height: 400px;
  flex-shrink: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.search-input-wrapper {
  margin: 0 auto;
  width: 1200px;
}

.search-input {
  width: 600px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.7);

  .search-suffix-btn {
    cursor: pointer;
    color: #18a058;
  }
}

@media (max-width: 1200px) {
  .search-input-wrapper {
    width: 80%;
  }
}

@media (max-width: 768px) {
  .search-input-bg {
    background-size: cover;
  }
}

@media (max-width: 430px) {
  .search-input-bg {
    height: 200px;
  }
}
</style>
