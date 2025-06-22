<template>
  <n-card title="备份管理">
    <template #header-extra>
      <n-button type="primary" @click="handleCreateBackup">
        <template #icon>
          <i-mdi-add></i-mdi-add>
        </template>
        新增备份
      </n-button>
    </template>
    <CTable :columns="columns" :table-data="tableData" :bordered="true" :striped="true">
      <template #time="{ row }">
        {{ formatDate(row.time) }}
      </template>
      <template #actions="{ row }">
        <n-button type="primary" @click="handleRestore(row.timeStr)"> 恢复备份 </n-button>
      </template>
    </CTable>
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
import { createBackup, getBackupList, restoreBackup } from '@/apis';
import type { BackupItem } from '@/types';
import dayjs from 'dayjs';
const message = useMessage();
// 表格列定义
const columns = [
  {
    title: '备份时间点',
    key: 'time',
  },
  {
    title: '操作',
    key: 'actions',
  },
];

// 模拟数据
const tableData = ref<BackupItem[]>([]);

// 分页配置
const pagination = ref({
  page: 1,
  size: 10,
  total: 0,
});
const loadBackupList = async () => {
  const res = await getBackupList();
  if (res.data) {
    tableData.value = res.data;
    pagination.value.total = res.data.length;
  }
};
// 分页变化
const pageChange = (page: number) => {
  pagination.value.page = page;
  loadBackupList();
};
// 创建备份
const handleCreateBackup = async () => {
  message.loading('正在创建备份...', { duration: 0 });
  const res = await createBackup({ timeout: 20000 });
  if (res.code === 0) {
    message.destroyAll();
    message.success('创建备份成功');
    loadBackupList(); // 刷新列表
  }
};
// 恢复备份
const handleRestore = async (timestamp: string) => {
  message.loading('正在恢复备份...', { duration: 0 });
  const res = await restoreBackup(timestamp, { timeout: 20000 });
  if (res.code === 0) {
    message.destroyAll();
    message.success('恢复备份成功');
    loadBackupList();
  } else {
    message.error(res.data.msg);
  }
};
const formatDate = (date: string) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};
onMounted(() => {
  loadBackupList();
});
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
