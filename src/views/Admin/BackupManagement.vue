<template>
  <n-card>
    <n-button type="primary" @click="createBackupList">
      <template #icon>
        <n-icon>
          <i-mdi-add style="font-size: 1.1rem; color: #fff" />
        </n-icon>
      </template>
      新增备份</n-button
    >
  </n-card>
  <n-card style="margin-top: 10px">
    <CTable :columns="columns" :table-data="backupData" :bordered="true" :striped="true" />
  </n-card>
</template>

<script lang="ts" setup>
import { NButton } from 'naive-ui';
import { getBackupList, createBackup, restoreBackup } from '@/apis/admin';
import { useMessage } from 'naive-ui';
const message = useMessage();
// 表格列定义
const columns = [
  {
    title: '备份名称',
    key: 'timeStr',
  },
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
          onClick: () => restore(row.timeStr),
        },
        { default: () => '恢复备份' },
      );
    },
  },
];
const getTableData = async () => {
  const data = await getBackupList();
  backupData.value = data.data;
};
const backupData = ref([]);
// 分页配置

const restore = async (time: string) => {
  const messageReactive = message.create('正在恢复备份', {
    type: 'loading',
    duration: 0,
  });
  const res = await restoreBackup(time);
  if (res.code == 0) {
    messageReactive.destroy();
    message.success('恢复备份成功');
    getTableData();
  }
};
const createBackupList = async () => {
  const messageReactive = message.create('正在创建备份', {
    type: 'loading',
    duration: 0,
  });
  const res = await createBackup();
  if (res.code === 0) {
    messageReactive.destroy();
    message.success('创建备份成功');
    getTableData();
  }
};
getTableData();
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
