<template>
  <div class="expert-list flex-column">
    <div class="flex row center-v end">
      <i-mdi-location></i-mdi-location>
      <span class="ml-10 fs-18 color-gray1 fw-600 py-27 text-right">专家库列表</span>
    </div>
    <div class="list">
      <!-- 表格区域 -->
      <n-card class="table-part">
        <CTable
          :columns="columns"
          :scroll-x="2000"
          :table-data="expertList"
          :row-key="(row) => row.id"
        >
        </CTable>
      </n-card>
      <!-- 分页区域 -->
      <div class="flex end mt-12">
        <n-pagination
          v-model:page="pages.page"
          :item-count="pages.total"
          :page-size="pages.size"
          :page-slot="7"
          @update:page="pageChange"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Expert } from '@/types';
import { searchExpertList, searchExpertConfig } from '@/apis';
import type { DataTableColumn } from 'naive-ui';
const columnsList = [
  {
    title: '姓名',
    key: 'name',
    fixed: 'left' as const,
  },
  {
    title: '性别',
    key: 'gender',
  },
  {
    title: '民族',
    key: 'ethnic',
  },
  {
    title: '面貌',
    key: 'politicalStatus',
  },
  {
    title: '身份证',
    key: 'idCard',
    width: 180,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '出生年月',
    key: 'birthDate',
  },
  {
    title: '关键词',
    key: 'keywords',
  },
  {
    title: '移动电话',
    key: 'mobilePhone',
    width: 120,
  },
  {
    title: '邮箱',
    key: 'email',
    width: 180,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '毕业院校',
    key: 'graduateSchool',
    width: 120,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '所学专业',
    key: 'major',
  },
  {
    title: '学位',
    key: 'degree',
  },
  {
    title: '从事领域',
    key: 'fields',
    width: 220,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '领域细分',
    key: 'domainDetail',
    width: 220,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '单位地址',
    key: 'unitAddress',
    width: 220,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '单位性质',
    key: 'unitNature',
  },
  {
    title: '（原）所在单位',
    key: 'originalUnit',
    width: 220,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '工作部门',
    key: 'department',
  },
  {
    title: '职务',
    key: 'position',
    width: 220,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '职称',
    key: 'title',
    width: 220,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '编号',
    key: 'number',
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '办公电话',
    key: 'officePhone',
    width: 150,
  },
  // {
  //   title: '操作',
  //   key: 'actions',
  //   fixed: 'right' as const,
  // },
].map((column) => ({
  ...column,
  minWidth: 100,
}));
const columns = ref<Array<DataTableColumn>>([]);
const expertList = ref<Expert[]>([]);
const pages = ref({
  page: 1,
  size: 10,
  total: 0,
});
const pageChange = (page: number) => {
  pages.value.page = page;
  searchExpert();
};
const searchExpert = () => {
  searchExpertList({
    page: pages.value.page,
    size: pages.value.size,
  }).then((data) => {
    if (data.code === 0 && data.data) {
      expertList.value = data.data.records;
      pages.value.total = data.data ? data.data.total! : 0;
    }
  });
};
const searchExpertConfigBox = () => {
  searchExpertConfig().then((data) => {
    if (data.code === 0) {
      const fieldsList = data.data?.visibleFields.split(',') || [];
      columns.value = columnsList.filter((item) => fieldsList.includes(item.key));
    }
  });
};
onMounted(() => {
  searchExpertConfigBox();
  searchExpert();
});
</script>

<style scoped lang="scss">
.expert-list {
  width: 1200px;
  margin: 16px auto;
}

@media screen and (max-width: 1200px) {
  .expert-list {
    width: 100%;
    padding: 0 20px;
  }
}
</style>
