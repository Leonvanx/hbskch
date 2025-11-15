<!--
  功能：数据备份version2
  作者：disonlv
  邮箱：disonlv@outlook.com
  时间：2025年11月15日 10:30:27
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <n-card title="文章备份管理">
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
  <n-modal v-model:show="showCreateBackupModal" closable>
    <n-card
      style="width: 500px"
      title="创建备份"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <!-- 表单 -->
      <n-form ref="editFormRef" :model="editTarget" :rules="editRules">
        <n-form-item label="备份名称" path="backupName">
          <n-input v-model:value="editTarget.backupName" placeholder="请输入备份名称"></n-input>
        </n-form-item>
        <n-form-item label="备份描述" path="description">
          <n-input v-model:value="editTarget.description" placeholder="请输入备份描述"></n-input>
        </n-form-item>
        <n-form-item label="备份开始时间" path="startTime">
          <n-date-picker
            v-model:formatted-value="editTarget.startTime"
            placeholder="请选择备份开始时间"
            value-format="yyyy-MM-dd"
            type="date"
            clearable
            style="width: 100%"
            :is-date-disabled="isStartTimeDisabled"
            @update:formatted-value="handleStartTimeUpdate"
          ></n-date-picker>
        </n-form-item>
        <n-form-item label="备份结束时间" path="endTime">
          <n-date-picker
            v-model:formatted-value="editTarget.endTime"
            placeholder="请选择备份结束时间"
            value-format="yyyy-MM-dd"
            type="date"
            clearable
            style="width: 100%"
            :is-date-disabled="isEndTimeDisabled"
            @update:formatted-value="handleEndTimeUpdate"
          ></n-date-picker>
        </n-form-item>
      </n-form>
      <template #footer>
        <n-flex justify="end">
          <n-button type="primary" @click="handleCreateBackupSubmit">新增</n-button>
          <n-button @click="showCreateBackupModal = false">取消</n-button>
        </n-flex>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { NButton, type FormInst, type FormRules } from 'naive-ui';
import { createBackup, deleteBackup, getBackupList, restoreBackup, downloadBackup } from '@/apis';
import type { BackupItem } from '@/types';
import dayjs from 'dayjs';
import type { BackupV2Item } from '@/types';
const message = useMessage();
const dialog = useDialog();
// 新增备份弹窗
const editFormRef = ref<FormInst | null>(null);
const editTarget = ref<BackupV2Item>({
  backupName: '',
  description: '',
  startTime: dayjs().format('YYYY-MM-DD'),
  endTime: dayjs().format('YYYY-MM-DD'),
});
const showCreateBackupModal = ref(false);

const isStartTimeDisabled = (ts: number) => {
  const todayEnd = dayjs().endOf('day').valueOf();
  if (ts > todayEnd) {
    return true; // 禁用未来日期
  }

  if (editTarget.value.endTime) {
    const endTime = dayjs(editTarget.value.endTime).endOf('day').valueOf();
    if (ts > endTime) {
      return true; // 禁用晚于结束日期的日期
    }
  }

  return false;
};

const isEndTimeDisabled = (ts: number) => {
  const todayEnd = dayjs().endOf('day').valueOf();
  if (ts > todayEnd) {
    return true; // 禁用未来日期
  }

  if (editTarget.value.startTime) {
    const startTime = dayjs(editTarget.value.startTime).startOf('day').valueOf();
    if (ts < startTime) {
      return true; // 禁用早于开始日期的日期
    }
  }

  return false;
};

const handleStartTimeUpdate = (value: string | null) => {
  if (value && editTarget.value.endTime) {
    if (dayjs(editTarget.value.endTime).isBefore(dayjs(value))) {
      editTarget.value.endTime = '';
    }
  }
};

const handleEndTimeUpdate = (value: string | null) => {
  if (value && editTarget.value.startTime) {
    if (dayjs(editTarget.value.startTime).isAfter(dayjs(value))) {
      editTarget.value.startTime = '';
    }
  }
};
const handleCreateBackupSubmit = () => {
  editFormRef.value?.validate((errors) => {
    if (!errors) {
      //添加新增内容接口
      console.log('新增备份内容：', editTarget.value);
      showCreateBackupModal.value = false;
      message.success('新增备份成功');
      // 重置表单
      editTarget.value = {};
      editFormRef.value?.restoreValidation();
    }
  });
};
const editRules: FormRules = {
  backupName: {
    required: true,
    message: '请输入备份名称',
    trigger: 'blur',
  },
  description: {
    required: true,
    message: '请输入备份描述',
    trigger: 'blur',
  },
  startTime: {
    required: true,
    message: '请选择备份开始时间',
    trigger: 'change',
  },
  endTime: {
    required: true,
    message: '请选择备份结束时间',
    trigger: 'change',
  },
};
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
  // 显示新增备份弹窗
  showCreateBackupModal.value = true;
  return;
  message.loading('正在创建备份...', { duration: 0 });
  createBackup({ timeout: 120000 })
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
      restoreBackup(timestamp, { timeout: 120000 })
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
      deleteBackup(str, { timeout: 120000 })
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
