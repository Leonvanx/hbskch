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
  <div class="search-input-bg flex-column" :style="{ backgroundImage: `url(${navMenuBgImgUrl})` }">
    <div class="flex1 flex-center search-input-wrapper">
      <n-input v-model:value="searchValue" class="search-input" size="large" placeholder="找不到你想了解的内容？" @keydown.enter="searchArticle()">
        <template #suffix>
          <span class="search-suffix-btn" @click="searchArticle()">搜一下</span>
        </template>
      </n-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import navMenuBgImg from '@/assets/imgs/nav-menu-bg.png';
import { useRouter } from 'vue-router';
const router = useRouter();
const searchValue = ref('');
const navMenuBgImgUrl = ref(navMenuBgImg);
const searchArticle = () => {
  router.push({
    name: 'SubMenuArticleList',
    query: {
      meunId: 0,
      searchWord: searchValue.value,
    },
  });
};
</script>

<style scoped lang="scss">
.search-input-bg {
  width: 100%;
  height: 400px;
  background-size: 100% 100%;
  flex-shrink: 0;
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
