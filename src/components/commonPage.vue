<!--
  功能：基础布局
  作者：disonlv
  邮箱：disonlv@outlook.com
  时间：2025年04月09日 12:31:41
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <n-flex vertical class="common-page">
    <n-card class="search-part">这里展示顶部搜素框（如果有）</n-card>
    <n-card class="table-part">
      <n-data-table :columns="columns" :data="tableData"></n-data-table>
      <!-- <n-button @click="openDrawer">default</n-button> -->
    </n-card>
    <n-card class="pagination-part">
      <n-flex justify="end">
        <n-pagination v-model:page="page" :page-count="100" :page-slot="7" />
      </n-flex>
    </n-card>
  </n-flex>
  <!-- 加一个侧边drawer -->
  <n-drawer v-model:show="active" :width="502" placement="right">
    <n-drawer-content>《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。</n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui';

interface RowData {
  key: number;
  name: string;
  age: number;
  address: string;
}
const createData = (): RowData[] => {
  return [
    {
      key: 0,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: 1,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: 2,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];
};
const createColumns = (): DataTableColumns<RowData> => {
  return [
    {
      title: 'Name',
      key: 'name',
    },
    {
      title: 'Age',
      key: 'age',
    },
    {
      title: 'Address',
      key: 'address',
    },
  ];
};

const active = ref<boolean>(false);
const page = ref<number>(1);
// const openDrawer = ():void => {
//   active.value = true;
// };
const tableData = ref<RowData[]>([]);
tableData.value = createData();
const columns = ref<DataTableColumns<RowData>>();
columns.value = createColumns();
</script>

<style scoped lang="scss">
.common-page {
  width: 100%;
  height: 100%;
  .table-part {
    flex: 1;
  }
  .pagination-part {
  }
}
</style>
