<!--
  功能：管理菜单
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
        <n-form-item path="title" label="标题">
          <n-input v-model:value="searchTarget.title" style="width: 150px" placeholder="请输入标题" />
        </n-form-item>
        <n-form-item path="subPath" label="子菜单">
          <n-select v-model:value="searchTarget.subPath" style="width: 150px" :options="selectOptions" placeholder="请选择子菜单" />
        </n-form-item>
        <n-form-item :show-label="false">
          <n-button type="primary" @click="add">新增</n-button>
        </n-form-item>
      </n-form>
    </n-card>
    <n-card class="table-part">
      <CTable :columns="columns" :data="tableData">
        <template #actions="{ row }">
          <n-space>
            <n-button strong tertiary size="small" @click="editRow(row)">编辑</n-button>
            <n-button strong tertiary size="small" @click="delRow(row)">删除</n-button>
          </n-space>
        </template>
      </CTable>
    </n-card>
    <n-card class="pagination-part">
      <n-flex justify="end">
        <n-pagination v-model:page="page" :page-count="100" :page-slot="7" />
      </n-flex>
    </n-card>
  </n-flex>
  <!-- 加一个侧边drawer -->
  <n-drawer v-model:show="drawerVisible" :width="1280" placement="right" :on-esc="closed" :on-mask-click="() => closed()">
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
        <n-form-item path="title" label="标题">
          <n-input v-model:value="editTarget.title" placeholder="请输入文章标题" />
        </n-form-item>
        <n-form-item path="subPath" label="展示子菜单">
          <n-select v-model:value="editTarget.subPath" :options="selectOptions" placeholder="请选择展示子菜单" />
        </n-form-item>
        <n-form-item path="isHomePage" label="在首页展示">
          <n-switch v-model:value="editTarget.isHomePage" :checked-value="1" :unchecked-value="0" />
        </n-form-item>
        <n-form-item path="isPathPage" label="在菜单展示">
          <n-switch v-model:value="editTarget.isPathPage" :checked-value="1" :unchecked-value="0" />
        </n-form-item>
        <n-form-item label="内容编辑">
          <RichTextEditor :content="editTarget.content"></RichTextEditor>
        </n-form-item>
      </n-form>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import type { FormRules, FormInst } from 'naive-ui';
import type { PageOptions } from '@/types';
import { savePage, searchPage } from '@/apis/admin';

// interface PageOptions {
//   id?: string | number;
//   title?: string;
//   subPath?: string;
//   pathName?: string;
//   isHomePage?: number;
//   isPathPage?: number;
//   updateTime?: string;
//   content?: string;
// }
const selectOptions = ref([
  { label: '全部', value: '' },
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
// 查找部分的变量
const searchRules: FormRules = {};
const searchFormRef = ref(null);
const searchTarget = ref<PageOptions>({
  title: '',
  subPath: '',
});
const searchParam = ref<PageOptions>({
  menuId: 1,
  page: 1,
  size: 10,
});
// 编辑部分的变量
const editRules: FormRules = {};
const editFormRef = ref<FormInst | null>(null);
const editTarget = ref<PageOptions>({
  title: '',
  subPath: '',
  isHomePage: 0,
  isPathPage: 0,
  content: '',
});

const drawerVisible = ref<boolean>(false);

const page = ref<number>(1);
const tableData = ref<PageOptions[]>([
  {
    id: 1,
    title: 'John Brown',
    subPath: '1',
    pathName: '子菜单1',
    isHomePage: 1,
    isPathPage: 1,
    updateTime: '2025-04-01',
    content: '123',
  },
  {
    id: 2,
    title: 'Jim Green',
    subPath: '2',
    pathName: '子菜单2',
    isHomePage: 1,
    isPathPage: 1,
    updateTime: '2025-04-01',
    content: '',
  },
  {
    id: 3,
    title: 'Joe Black',
    subPath: '3',
    pathName: '子菜单3',
    isHomePage: 1,
    isPathPage: 1,
    updateTime: '2025-04-01',
    content: '',
  },
]);
const columns = [
  {
    title: '文章标题',
    key: 'title',
  },
  {
    title: '子菜单',
    key: 'pathName',
  },
  {
    title: '在首页展示',
    key: 'isHomePage',
  },
  {
    title: '在菜单展示',
    key: 'isPathPage',
  },
  {
    title: '更新时间',
    key: 'updateTime',
  },
  {
    title: '操作',
    key: 'actions',
  },
];
const editRow = (row: PageOptions) => {
  editTarget.value = { ...row };
  drawerVisible.value = true;
};
const delRow = (row: PageOptions) => {
  console.log('🚀 ~ delRow ~ row:', row);
};
const searchData = () => {
  searchPage(searchParam.value).then((data) => {
    if (data.code === '0') {
      console.log('searchDate:', data.data);
      tableData.value = data.data ? data.data.records : [];
    }
  });
};
const add = () => {
  editTarget.value = {};
  drawerVisible.value = true;
};
const submit = () => {
  console.log('submit', editTarget.value);
  //添加新增内容接口
  savePage(editTarget.value).then((data) => {
    if (data.code) {
    }
  });
  closed();
};
const cancel = () => {
  closed();
};
const closed = () => {
  drawerVisible.value = false;
  editTarget.value = {};
};
onMounted(() => {
  searchData();
});
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
