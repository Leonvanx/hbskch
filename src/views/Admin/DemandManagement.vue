<!--
  功能：成果需方管理
  作者：disonlv
  邮箱：disonlv@outlook.com
  时间：2025年09月21日 12:56:16
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
        <n-form-item label="需求名称">
          <n-input v-model:value="searchTarget.name" placeholder="请输入需求名称" />
        </n-form-item>
        <n-form-item label="所属领域">
          <n-input v-model:value="searchTarget.field" placeholder="请输入所属领域" />
        </n-form-item>
        <!-- 按钮，新增，上传需方excel文件 -->
        <n-form-item>
          <n-space>
            <n-button type="primary" @click="searchDemand">
              <template #icon>
                <n-icon>
                  <i-mdi-search style="font-size: 1.1rem; color: #fff" />
                </n-icon>
              </template>
              搜索</n-button
            >
            <n-button type="primary" @click="addDemand">
              <template #icon>
                <n-icon>
                  <i-mdi-add style="font-size: 1.1rem; color: #fff" />
                </n-icon>
              </template>
              新增</n-button
            >
            <n-upload
              :custom-request="handleCustomRequest"
              accept=".xlsx"
              :show-file-list="false"
              :on-finish="onFinish"
            >
              <n-button type="primary">上传</n-button>
            </n-upload>
            <n-button type="primary" @click="handleExportDemand">
              <template #icon>
                <n-icon>
                  <i-mdi-download style="font-size: 1.1rem; color: #fff" />
                </n-icon>
              </template>
              导出</n-button
            >
          </n-space>
        </n-form-item>
      </n-form>
    </n-card>
    <!-- 表格区域 -->
    <n-card class="table-part">
      <CTable
        :columns="columns"
        :scroll-x="5000"
        :table-data="demandList"
        :row-key="(row) => row.id"
      >
        <template #actions="{ row }">
          <n-space>
            <n-button strong tertiary size="small" title="编辑" @click="editDemand(row)">
              <template #icon>
                <n-icon>
                  <i-iconoir-edit style="font-size: 1.1rem; color: #000" />
                </n-icon>
              </template>
            </n-button>
            <n-button strong tertiary size="small" title="删除" @click="delDemand(row)">
              <template #icon>
                <n-icon>
                  <i-material-symbols-light-delete style="font-size: 1.1rem; color: #000" />
                </n-icon>
              </template>
            </n-button>
          </n-space>
        </template>
      </CTable>
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
  <n-drawer v-model:show="drawerVisible" width="90%" placement="right">
    <n-drawer-content>
      <template #header>
        {{ editTarget?.id ? '编辑' : '新增' }}
      </template>
      <template #footer>
        <n-space>
          <n-button @click="cancel">取消</n-button>
          <n-button type="primary" @click="saveDemand">保存</n-button>
        </n-space>
      </template>
      <!-- 表单，覆盖所有信息 -->
      <n-form ref="formRef" :model="editTarget" label-placement="top">
        <n-grid :cols="16" :x-gap="24">
          <n-form-item-gi :span="8" label="序号" path="serialNumber">
            <n-input v-model:value="editTarget.serialNumber" placeholder="请输入序号" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="所属领域" path="field">
            <n-input v-model:value="editTarget.field" placeholder="请输入所属领域" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="需求名称" path="demandName">
            <n-input v-model:value="editTarget.demandName" placeholder="请输入需求名称" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="预计投入" path="expectedInvestment">
            <n-input
              v-model:value="editTarget.expectedInvestment"
              placeholder="请输入预计投入金额"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="需求单位" path="demandUnit">
            <n-input v-model:value="editTarget.demandUnit" placeholder="请输入需求单位" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="需求时间" path="demandTime">
            <n-input v-model:value="editTarget.demandTime" placeholder="请输入需求时间" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="联系人" path="contactPerson">
            <n-input v-model:value="editTarget.contactPerson" placeholder="请输入联系人" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="联系电话" path="contactPhone">
            <n-input v-model:value="editTarget.contactPhone" placeholder="请输入联系电话" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="电子邮箱" path="email">
            <n-input v-model:value="editTarget.email" placeholder="请输入电子邮箱" />
          </n-form-item-gi>
          <n-form-item-gi :span="16" label="需求概述" path="demandOverview">
            <n-input
              v-model:value="editTarget.demandOverview"
              type="textarea"
              placeholder="请输入需求概述"
              :autosize="{ minRows: 3, maxRows: 5 }"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="16" label="需求详情" path="demandDetails">
            <n-input
              v-model:value="editTarget.demandDetails"
              type="textarea"
              placeholder="请输入需求详情"
              :autosize="{ minRows: 3, maxRows: 5 }"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="16" label="技术参数" path="technicalParameters">
            <n-input
              v-model:value="editTarget.technicalParameters"
              type="textarea"
              placeholder="请输入技术参数"
              :autosize="{ minRows: 3, maxRows: 5 }"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="16" label="预期效果" path="expectedEffect">
            <n-input
              v-model:value="editTarget.expectedEffect"
              type="textarea"
              placeholder="请输入预期效果"
              :autosize="{ minRows: 3, maxRows: 5 }"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="16" label="备注" path="remarks">
            <n-input
              v-model:value="editTarget.remarks"
              type="textarea"
              placeholder="请输入备注"
              :autosize="{ minRows: 2, maxRows: 4 }"
            />
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import type { Demand, DemandOptions } from '@/types';
import type { UploadCustomRequestOptions } from 'naive-ui';
import {
  searchDemandListAll,
  uploadDemandExcel,
  editDemandList,
  saveDemandList,
  deleteDemandList,
  exportDemand,
} from '@/apis';
import dayjs from 'dayjs';
// const message = useMessage();
const dialog = useDialog();
const drawerVisible = ref<boolean>(false);
const searchTarget = ref<DemandOptions>({});
const editTarget = ref<Demand>({});
const message = useMessage();

const handleCustomRequest = async ({ file }: UploadCustomRequestOptions) => {
  const data = await uploadDemandExcel({ file: file.file! });
  if (data.code === 0) {
    message.success('上传成功！');
    pageChange(1);
  } else {
    message.success('上传失败！');
  }
};
const onFinish = () => {
  console.log('finish');
};
const columns = [
  //加上序号展示
  {
    key: 'serialNumber',
    title: '序号',
    width: 80,
  },
  {
    title: '所属领域',
    key: 'field',
    width: 120,
  },
  {
    title: '需求名称',
    key: 'demandName',
    width: 200,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '预计投入',
    key: 'expectedInvestment',
    width: 120,
  },
  {
    title: '需求单位',
    key: 'demandUnit',
    width: 180,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '需求概述',
    key: 'demandOverview',
    width: 200,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '需求详情',
    key: 'demandDetails',
    width: 200,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '技术参数',
    key: 'technicalParameters',
    width: 180,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '预期效果',
    key: 'expectedEffect',
    width: 180,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '需求时间',
    key: 'demandTime',
    width: 120,
  },
  {
    title: '联系人',
    key: 'contactPerson',
    width: 100,
  },
  {
    title: '联系电话',
    key: 'contactPhone',
    width: 140,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '电子邮箱',
    key: 'email',
    width: 180,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '备注',
    key: 'remarks',
    width: 200,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '操作',
    key: 'actions',
    width: 120,
    fixed: 'right' as const,
  },
].map((column) => ({
  ...column,
  minWidth: 100,
}));
const demandList = ref<Demand[]>([]);
const pages = ref({
  page: 1,
  size: 10,
  total: 0,
});
const pageChange = (page: number) => {
  pages.value.page = page;
  searchDemand();
};
//需方列表查询
const searchDemand = () => {
  pages.value.page = 1;
  searchDemandListAll({
    name: searchTarget.value.name,
    page: pages.value.page,
    size: pages.value.size,
    field: searchTarget.value.field,
  }).then((data) => {
    if (data.code === 0 && data.data) {
      demandList.value = data.data?.records;
      pages.value.total = data.data ? data.data.total! : 0;
    }
  });
};

const addDemand = () => {
  editTarget.value = {};
  drawerVisible.value = true;
};

const editDemand = (row: Demand) => {
  editTarget.value = { ...row };
  drawerVisible.value = true;
};
//删除需方
const delDemand = (row: Demand) => {
  // 提示
  dialog.warning({
    title: '警告',
    content: `你确定删除该需方信息吗？`,
    positiveText: '确定',
    negativeText: '取消',
    draggable: true,
    onPositiveClick: () => {
      deleteDemandList(row.id ? row.id : 0).then((data) => {
        if (data.code === 0) {
          message.success('删除成功！');
          pageChange(1);
        }
      });
    },
  });
};

const cancel = () => {
  drawerVisible.value = false;
  editTarget.value = {};
};

//编辑/新增需方
const saveDemand = () => {
  if (editTarget.value?.id) {
    const payload = {
      ...editTarget.value,
    };
    editDemandList(payload).then((data) => {
      if (data.code === 0) {
        message.success('修改成功！');
        if (editTarget.value.id) {
          pageChange(pages.value.page);
        } else {
          pageChange(1);
        }
        cancel();
      }
    });
  } else {
    const params = {
      ...editTarget.value,
    };
    saveDemandList(params).then((data) => {
      if (data.code === 0) {
        message.success('保存成功！');
        if (editTarget.value.id) {
          pageChange(pages.value.page);
        } else {
          pageChange(1);
        }
        cancel();
      }
    });
  }
};
// 导出需方
const handleExportDemand = () => {
  const params = {};
  exportDemand(params)
    .then((response) => {
      // 创建 blob 对象
      const blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // 创建下载链接
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      // 设置文件名
      const fileName = `成果需方_${dayjs().format('YYYY-MM-DD_HH-mm-ss')}.xlsx`;
      link.download = fileName;

      // 触发下载
      document.body.appendChild(link);
      link.click();

      // 清理
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      message.success('导出成功！');
    })
    .catch((error) => {
      console.error('导出失败:', error);
      message.error('导出失败！');
    });
};
searchDemand();
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
<style>
.v-binder-follower-content {
  max-width: 600px;
}
</style>
