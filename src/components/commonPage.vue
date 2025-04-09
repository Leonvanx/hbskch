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
    <n-card class="search-part">
      <n-button type="primary" @click="add">新增</n-button>
    </n-card>
    <n-card class="table-part">
      <n-data-table :columns="columns" :data="tableData"></n-data-table>
    </n-card>
    <n-card class="pagination-part">
      <n-flex justify="end">
        <n-pagination v-model:page="page" :page-count="100" :page-slot="7" />
      </n-flex>
    </n-card>
  </n-flex>
  <!-- 加一个侧边drawer -->
  <n-drawer v-model:show="drawerVisible" :width="502" placement="right" :on-esc="closed" :on-mask-click="() => closed()">
    <n-drawer-content>
      <template #header>
        {{ editTarget?.id ? '编辑' : '新增' }}
      </template>
      <template #footer>
        <n-space>
          <n-button @click="cancel">取消</n-button>
          <n-button type="primary" @click="submit">保存</n-button>
        </n-space>
      </template>
      <n-form ref="formRef" :model="editTarget" :rules="rules">
        <n-form-item path="name" label="Name">
          <n-input v-model:value="editTarget.name" />
        </n-form-item>
        <n-form-item path="age" label="Age">
          <n-input v-model:value="editTarget.age" />
        </n-form-item>
        <n-form-item path="address" label="Address">
          <n-input v-model:value="editTarget.address" />
        </n-form-item>
      </n-form>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import type { DataTableColumns, FormRules } from 'naive-ui';
import { NButton, NSpace } from 'naive-ui';

interface RowData {
  id?: string | number;
  name?: string;
  age?: number;
  address?: string;
}
const rules: FormRules = {};
const editTarget = ref<RowData>();
const drawerVisible = ref<boolean>(false);
const createData = (): RowData[] => {
  return [
    {
      id: 1,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      id: 2,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      id: 3,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];
};
const createColumns = ({ edit, del }: { edit: (row: RowData) => void; del: (row: RowData) => void }): DataTableColumns<RowData> => {
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
    {
      title: 'Action',
      key: 'actions',
      render(row) {
        return h(NSpace, [
          h(
            NButton,
            {
              strong: true,
              tertiary: true,
              size: 'small',
              onClick: () => edit(row),
            },
            { default: () => '编辑' },
          ),
          h(
            NButton,
            {
              strong: true,
              tertiary: true,
              size: 'small',
              onClick: () => del(row),
            },
            { default: () => '删除' },
          ),
        ]);
      },
    },
  ];
};

const page = ref<number>(1);
const tableData = ref<RowData[]>([]);
tableData.value = createData();
const columns = ref<DataTableColumns<RowData>>();
columns.value = createColumns({
  edit(rowData: RowData) {
    console.log(rowData);
    drawerVisible.value = true;
    editTarget.value = JSON.parse(JSON.stringify(rowData));
  },
  del({ id }: RowData) {
    console.log(id);
  },
});

const add = (): void => {
  editTarget.value = {};
  drawerVisible.value = true;
};
const submit = (): void => {
  console.log('submit');
  closed();
};
const cancel = (): void => {
  closed();
};
const closed = (): void => {
  drawerVisible.value = false;
  editTarget.value = {};
};
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
