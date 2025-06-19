<template>
  <n-card title="备份管理">
    <CTable :columns="columns" :table-data="backupData" :bordered="true" :striped="true" />
  </n-card>
  <n-card class="pagination-container">
    <n-pagination
      v-model:page="pagination.page"
      :item-count="pagination.total"
      :page-size="pagination.size"
      :page-slot="7"
      @update:page="pageChange"
    />
  </n-card>
</template>

<script lang="ts" setup>
import { NButton } from 'naive-ui';

// 表格列定义
const columns = [
  {
    title: '备份时间点',
    key: 'time',
  },
  {
    title: '操作',
    key: 'actions',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(row: any) {
      return h(
        NButton,
        {
          type: 'primary',
          onClick: () => restoreBackup(row.id),
        },
        { default: () => '恢复备份' },
      );
    },
  },
];

// 模拟数据
const backupData = ref([
  { id: 1, time: '2023-10-01 10:00:00' },
  { id: 2, time: '2023-10-02 14:30:00' },
  { id: 3, time: '2023-10-03 09:15:00' },
]);

// 分页配置
const pagination = ref({
  page: 1,
  size: 10,
  total: 0,
});
function pageChange(page: number) {
  pagination.value.page = page;
}
const restoreBackup = (id: number) => {
  console.log('🚀 ~ restoreBackup ~ id:', id);
};
</script>

<style lang="scss" scoped>
/* 新增样式 */
.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  :deep(.n-card__content) {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
