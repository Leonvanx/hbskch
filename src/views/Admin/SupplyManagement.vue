<!--
  功能：成果供方管理
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
        <n-form-item label="成果名称">
          <n-input v-model:value="searchTarget.name" placeholder="请输入成果名称" />
        </n-form-item>
        <n-form-item label="从事领域">
          <n-input v-model:value="searchTarget.field" placeholder="请输入从事领域" />
        </n-form-item>
        <!-- 按钮，新增，上传专家excel文件 -->
        <n-form-item>
          <n-space>
            <n-button type="primary" @click="searchSupply">
              <template #icon>
                <n-icon>
                  <i-mdi-search style="font-size: 1.1rem; color: #fff" />
                </n-icon>
              </template>
              搜索</n-button
            >
            <n-button type="primary" @click="addSupply">
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
            <n-button type="primary" @click="handleExportSupply">
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
        :table-data="supplyList"
        :row-key="(row) => row.id"
      >
        <template #actions="{ row }">
          <n-space>
            <n-button strong tertiary size="small" title="编辑" @click="editExpert(row)">
              <template #icon>
                <n-icon>
                  <i-iconoir-edit style="font-size: 1.1rem; color: #000" />
                </n-icon>
              </template>
            </n-button>
            <n-button strong tertiary size="small" title="删除" @click="delSupply(row)">
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
          <n-button type="primary" @click="saveSupply">保存</n-button>
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
          <n-form-item-gi :span="8" label="成果名称" path="achievementName">
            <n-input v-model:value="editTarget.achievementName" placeholder="请输入成果名称" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="成果单位" path="achievementUnit">
            <n-input v-model:value="editTarget.achievementUnit" placeholder="请输入成果单位" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="成果概述" path="achievementOverview">
            <n-input
              v-model:value="editTarget.achievementOverview"
              type="textarea"
              placeholder="请输入成果概述"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="成果详情" path="achievementDetails">
            <n-input
              v-model:value="editTarget.achievementDetails"
              type="textarea"
              placeholder="请输入成果详情"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="核心竞争力" path="coreCompetitiveness">
            <n-input
              v-model:value="editTarget.coreCompetitiveness"
              type="textarea"
              placeholder="请输入核心竞争力"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="技术特点" path="technicalFeatures">
            <n-input
              v-model:value="editTarget.technicalFeatures"
              type="textarea"
              placeholder="请输入技术特点"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="知识产权形式" path="intellectualPropertyForm">
            <n-input
              v-model:value="editTarget.intellectualPropertyForm"
              placeholder="请输入知识产权形式"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="拟转化形式" path="intendedTransformationForm">
            <n-input
              v-model:value="editTarget.intendedTransformationForm"
              placeholder="请输入拟转化形式"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="转化所需条件" path="transformationConditions">
            <n-input
              v-model:value="editTarget.transformationConditions"
              type="textarea"
              placeholder="请输入转化所需条件"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="负责人姓名" path="responsiblePerson">
            <n-input v-model:value="editTarget.responsiblePerson" placeholder="请输入负责人姓名" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="联系电话" path="contactPhone">
            <n-input v-model:value="editTarget.contactPhone" placeholder="请输入联系电话" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="成果证明材料" path="achievementProofMaterials">
            <n-input
              v-model:value="editTarget.achievementProofMaterials"
              type="textarea"
              placeholder="请输入成果证明材料"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="其他说明" path="otherNotes">
            <n-input
              v-model:value="editTarget.otherNotes"
              type="textarea"
              placeholder="请输入其他说明"
            />
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import type { Supply, SupplyOptions } from '@/types';
import type { UploadCustomRequestOptions } from 'naive-ui';
import {
  searchSupplyList,
  uploadSupplyExcel,
  editSupplyList,
  saveSupplyList,
  deleteSupplyList,
  exportSupply,
} from '@/apis';
import dayjs from 'dayjs';
// const message = useMessage();
const dialog = useDialog();
const drawerVisible = ref<boolean>(false);
const searchTarget = ref<SupplyOptions>({});
const editTarget = ref<Supply>({});
const message = useMessage();

const handleCustomRequest = async ({ file }: UploadCustomRequestOptions) => {
  const data = await uploadSupplyExcel({ file: file.file! });
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
    width: 220,
  },
  {
    title: '成果名称',
    key: 'achievementName',
    width: 260,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '成果单位',
    key: 'achievementUnit',
    width: 220,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '成果概述',
    key: 'achievementOverview',
    width: 280,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '成果详情',
    key: 'achievementDetails',
    width: 280,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '核心竞争力',
    key: 'coreCompetitiveness',
    width: 220,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '技术特点',
    key: 'technicalFeatures',
    width: 220,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '知识产权形式',
    key: 'intellectualPropertyForm',
    width: 220,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '拟转化形式',
    key: 'intendedTransformationForm',
    width: 200,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '转化所需条件',
    key: 'transformationConditions',
    width: 200,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '负责人姓名',
    key: 'responsiblePerson',
    width: 200,
  },
  {
    title: '联系电话',
    key: 'contactPhone',
    width: 200,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '成果证明材料',
    key: 'achievementProofMaterials',
    width: 200,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '其他说明',
    key: 'otherNotes',
    width: 280,
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
const supplyList = ref<Supply[]>([]);
const pages = ref({
  page: 1,
  size: 10,
  total: 0,
});
const pageChange = (page: number) => {
  pages.value.page = page;
  searchSupply();
};
//专家库列表查询
const searchSupply = () => {
  pages.value.page = 1;
  searchSupplyList({
    name: searchTarget.value.name,
    page: pages.value.page,
    size: pages.value.size,
    field: searchTarget.value.field,
  }).then((data) => {
    if (data.code === 0 && data.data) {
      supplyList.value = data.data?.records;
      pages.value.total = data.data ? data.data.total! : 0;
    }
  });
};

const addSupply = () => {
  drawerVisible.value = true;
};

const editExpert = (row: Supply) => {
  editTarget.value = row;
  drawerVisible.value = true;
};
//删除专家
const delSupply = (row: Supply) => {
  // 提示
  dialog.warning({
    title: '警告',
    content: `你确定删除该供方信息吗？`,
    positiveText: '确定',
    negativeText: '取消',
    draggable: true,
    onPositiveClick: () => {
      deleteSupplyList(row.id ? row.id : 0).then((data) => {
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

//编辑/新增专家
const saveSupply = () => {
  if (editTarget.value?.id) {
    const payload = {
      ...editTarget.value,
    };
    editSupplyList(payload).then((data) => {
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
    saveSupplyList(params).then((data) => {
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
// 导出专家库
const handleExportSupply = () => {
  const params = {};
  exportSupply(params)
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
      const fileName = `成果供方_${dayjs().format('YYYY-MM-DD_HH-mm-ss')}.xlsx`;
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
searchSupply();
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
