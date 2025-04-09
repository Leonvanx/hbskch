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
      <!-- 加上搜索功能/分类 -->
      <n-form ref="searchFormRef" class="search-form" label-placement="left" inline :label-width="80" :model="searchTarget" :rules="searchRules">
        <n-form-item path="name" label="标题">
          <n-input v-model:value="searchTarget.name" style="width: 150px" placeholder="请输入标题" />
        </n-form-item>
        <n-form-item path="subPath" label="子菜单">
          <n-select v-model:value="searchTarget.subPath" style="width: 150px" :options="searchSelect" placeholder="请选择子菜单" />
        </n-form-item>
        <n-form-item :show-label="false">
          <n-button type="primary" @click="add">新增</n-button>
        </n-form-item>
      </n-form>
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
        {{ editTarget?.id ? '编辑文章' : '新增文章' }}
      </template>
      <template #footer>
        <n-space>
          <n-button @click="cancel">取消</n-button>
          <n-button type="primary" @click="submit">保存</n-button>
        </n-space>
      </template>
      <n-form ref="editFormRef" :model="editTarget" :rules="editRules">
        <n-form-item path="name" label="标题">
          <n-input v-model:value="editTarget.name" placeholder="请输入文章标题" />
        </n-form-item>
        <n-form-item path="subPath" label="展示子菜单">
          <n-select v-model:value="editTarget.subPath" :options="editSelect" placeholder="请选择展示子菜单" />
        </n-form-item>
        <n-form-item label="内容编辑">
          <ai-editor></ai-editor>
        </n-form-item>
      </n-form>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import type { DataTableColumns, FormRules, FormInst, SelectOption } from 'naive-ui';
import { NButton, NSpace } from 'naive-ui';

interface RowData {
  id?: string | number;
  name?: string;
  subPath?: string;
  pathName?: string;
}
const editSelect = ref<SelectOption[]>([
  {
    label: '菜单1',
    value: '1',
  },
  {
    label: '菜单2',
    value: '2',
  },
  {
    label: '菜单3',
    value: '3',
  },
]);
const searchSelect = computed((): SelectOption[] => {
  return [{ label: '全部', value: '' }, ...editSelect.value];
});
// 查找部分的变量
const searchRules: FormRules = {};
const searchFormRef = ref<FormInst | null>(null);
const searchTarget = ref<RowData>({
  name: '',
  subPath: '',
});
// 编辑部分的变量
const editRules: FormRules = {};
const editFormRef = ref<FormInst | null>(null);
const editTarget = ref<RowData>();

const drawerVisible = ref<boolean>(false);
const createData = (): RowData[] => {
  return [
    {
      id: 1,
      name: 'John Brown',
      subPath: '1',
      pathName: '子菜单1',
    },
    {
      id: 2,
      name: 'Jim Green',
      subPath: '2',
      pathName: '子菜单2',
    },
    {
      id: 3,
      name: 'Joe Black',
      subPath: '3',
      pathName: '子菜单3',
    },
  ];
};
const createColumns = ({ edit, del }: { edit: (row: RowData) => void; del: (row: RowData) => void }): DataTableColumns<RowData> => {
  return [
    {
      title: '文章标题',
      key: 'name',
    },
    {
      title: '子菜单',
      key: 'pathName',
    },
    {
      title: '文章预览',
      key: 'address',
    },
    {
      title: '操作',
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
