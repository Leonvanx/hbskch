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
        <n-flex>
          <n-button type="primary" @click="handleRestore(row.timeStr)"> 恢复备份 </n-button>
          <n-button type="error" @click="handleDelete(row.time)"> 删除备份 </n-button>
          <n-button type="info" @click="download(row.time)"> 导出备份 </n-button>
        </n-flex>
      </template>
    </CTable>
  </n-card>
</template>

<script lang="ts" setup>
import { NButton } from 'naive-ui';
import { createBackup, deleteBackup, getBackupList, restoreBackup, downloadBackup } from '@/apis';
import type { BackupItem } from '@/types';
import dayjs from 'dayjs';
const message = useMessage();
const dialog = useDialog();
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
const loadBackupList = async () => {
  const res = await getBackupList();
  if (res.data) {
    tableData.value = res.data;
  }
};
// 创建备份
const handleCreateBackup = () => {
  message.loading('正在创建备份...', { duration: 0 });
  createBackup({ timeout: 50000 })
    .then((res) => {
      if (res.code === 0) {
        message.destroyAll();
        message.success('创建备份成功');
        loadBackupList(); // 刷新列表
      }
    })
    .catch(() => {
      message.destroyAll();
    });
};
// 恢复备份
const handleRestore = async (timestamp: string) => {
  dialog.success({
    title: '警告',
    content: '你确定恢复备份吗？',
    positiveText: '确定',
    negativeText: '取消',
    draggable: true,
    onPositiveClick: () => {
      message.loading('正在恢复备份...', { duration: 0 });
      restoreBackup(timestamp, { timeout: 50000 })
        .then((res) => {
          if (res.code === 0) {
            message.destroyAll();
            message.success('恢复备份成功');
            loadBackupList();
          } else {
            message.error(res.data.msg);
          }
        })
        .catch(() => {
          message.destroyAll();
        });
    },
  });
};
const download = async (timestamp: string) => {
  // 直接跳到新页面打开
  window.open(downloadBackup(formatDate(timestamp)), '_blank');
};
const handleDelete = async (timestamp: string) => {
  dialog.warning({
    title: '警告',
    content: '你确定删除备份吗？',
    positiveText: '确定',
    negativeText: '取消',
    draggable: true,
    onPositiveClick: () => {
      message.loading('正在删除备份...', { duration: 0 });
      const str = dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
      deleteBackup(str, { timeout: 50000 })
        .then((res) => {
          if (res.code === 0) {
            message.destroyAll();
            message.success('删除备份成功');
            loadBackupList();
          } else {
            message.error(res.data.msg);
          }
        })
        .catch(() => {
          message.destroyAll();
        });
    },
  });
};
const formatDate = (date: string) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};
onMounted(() => {
  loadBackupList();
});
</script>

<style lang="scss" scoped></style>
