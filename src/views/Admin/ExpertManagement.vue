<!--
  功能：专家库维护
  作者：disonlv
  邮箱：disonlv@outlook.com
  时间：2025年06月05日 10:32:16
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <n-flex vertical class="common-page">
    <!-- 搜索区域 -->
    <n-card class="search-part">
      <!-- 搜索区域，有上传按钮 -->
      <n-form
        ref="searchFormRef"
        class="search-form"
        label-placement="left"
        inline
        :label-width="80"
        :model="searchTarget"
      >
        <n-form-item label="专家姓名">
          <n-input v-model:value="searchTarget.name" placeholder="请输入专家姓名" />
        </n-form-item>
        <!-- 按钮，新增，上传专家excel文件 -->
        <n-form-item>
          <n-space>
            <n-button type="primary">
              <template #icon>
                <n-icon>
                  <i-mdi-search style="font-size: 1.1rem; color: #fff" />
                </n-icon>
              </template>
              搜索</n-button
            >
            <n-button type="primary"> 重置</n-button>
            <n-button type="primary">新增</n-button>
            <n-button type="primary">上传</n-button>
          </n-space>
        </n-form-item>
      </n-form>
    </n-card>
    <!-- 表格区域 -->
    <n-card class="table-part">
      <!-- <CTable> </CTable> -->
    </n-card>
    <!-- 分页区域 -->
    <n-card class="pagination-part">
      <n-pagination
        v-model:page="pages.page"
        :item-count="pages.total"
        :page-size="pages.size"
        :page-slot="7"
        @update:page="pageChange"
      />
    </n-card>
  </n-flex>
</template>

<script setup lang="ts">
import type { Expert } from '@/types';
// const message = useMessage();
// const dialog = useDialog();
const searchTarget = ref<Expert>({});
const tableData = ref<Expert[]>([]);
const pages = ref({
  page: 1,
  size: 10,
  total: 0,
});
const pageChange = (page: number) => {
  pages.value.page = page;
  searchData();
};
const searchData = () => {
  tableData.value = [];
};
searchData();
</script>

<style scoped lang="scss">
.common-page {
  width: 100%;
  height: 100%;

  .search-part {
    .search-form {
      margin-bottom: -24px !important;
    }
  }

  .table-part {
    flex: 1;
  }

  .pagination-part {
  }
}
</style>
