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
      <n-form
        ref="searchFormRef"
        class="search-form"
        label-placement="left"
        inline
        :label-width="80"
        :model="searchTarget"
        :rules="searchRules"
      >
        <n-form-item path="title" label="标题">
          <n-input
            v-model:value="searchTarget.searchWord"
            clearable
            style="width: 150px"
            placeholder="请输入标题"
          />
        </n-form-item>
        <n-form-item path="menuId" label="菜单">
          <n-tree-select
            v-model:value="searchTarget.menuId"
            key-field="id"
            label-field="name"
            clearable
            style="width: 200px"
            :options="menuList"
            placeholder="请选择菜单"
          />
        </n-form-item>
        <n-form-item :show-label="false">
          <n-space>
            <n-button type="primary" @click="search">
              <template #icon>
                <n-icon>
                  <i-mdi-search style="font-size: 1.1rem; color: #fff" />
                </n-icon>
              </template>
              搜索</n-button
            >
            <n-button type="primary" @click="add">
              <template #icon>
                <n-icon>
                  <i-mdi-add style="font-size: 1.1rem; color: #fff" />
                </n-icon>
              </template>
              新增</n-button
            >
          </n-space>
        </n-form-item>
      </n-form>
    </n-card>
    <n-card class="table-part">
      <CTable :columns="columns" :table-data="tableData">
        <template #menuId="{ row }">
          <!-- 从菜单里面找到对应的子菜单 -->

          {{ serachMenuName(row) }}
        </template>
        <template #coverImage="{ row }">
          <template v-if="row.coverImage">
            <n-image :src="row.coverImage" width="50" height="50"></n-image>
          </template>
          <template v-else>
            <img src="@/assets/icons/default_image.svg" width="50" height="50" />
          </template>
        </template>
        <template #status="{ row }">
          <n-switch
            v-model:value="row.status"
            :checked-value="1"
            :unchecked-value="0"
            @change="() => changeShowStatus('status', row)"
          />
        </template>
        <template #showType="{ row }">
          <template v-if="row.summary && row.showType">
            {{ showTypeList.find((item) => item.value == row.showType)?.label }}
          </template>
        </template>
        <template #summary="{ row }">
          <n-switch
            v-model:value="row.summary"
            :checked-value="1"
            :unchecked-value="0"
            @change="() => changeShowStatus('summary', row)"
          />
        </template>
        <template #actions="{ row }">
          <n-space>
            <n-button title="编辑" strong tertiary size="small" @click="editRow(row)">
              <template #icon>
                <n-icon>
                  <i-iconoir-edit style="font-size: 1.1rem; color: #000" />
                </n-icon> </template
            ></n-button>
            <n-button strong tertiary size="small" title="删除" @click="delRow(row)"
              ><template #icon>
                <n-icon>
                  <i-material-symbols-light-delete style="font-size: 1.2rem; color: #000" />
                </n-icon> </template
            ></n-button>
          </n-space>
        </template>
      </CTable>
    </n-card>
    <n-card class="pagination-part">
      <n-flex justify="end">
        <n-pagination
          v-model:page="pages.page"
          :item-count="pages.total"
          :page-size="pages.size"
          :page-slot="7"
          @update:page="pageChange"
        />
      </n-flex>
    </n-card>
  </n-flex>
  <!-- 加一个侧边drawer -->
  <n-drawer
    v-model:show="drawerVisible"
    width="90%"
    placement="right"
    :on-esc="closed"
    :on-mask-click="() => closed()"
  >
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
        <n-form-item path="coverImage" label="展示图">
          <CommonUpload v-model:fileUrl="editTarget.coverImage" :max="1"></CommonUpload>
        </n-form-item>
        <n-form-item path="menuId" label="展示菜单">
          <n-tree-select
            v-model:value="editTarget.menuId"
            key-field="id"
            label-field="name"
            clearable
            :options="menuList"
            placeholder="请选择菜单"
          />
        </n-form-item>
        <!-- <n-form-item path="orderNum" label="展示排序">
          <n-input-number v-model:value="editTarget.orderNum" clearable placeholder="请输入排序" />
        </n-form-item> -->
        <n-form-item path="summary" label="是否展示在首页">
          <n-switch
            v-model:value="editTarget.summary"
            :checked-value="1"
            :unchecked-value="0"
            @change="changeEditSummary"
          />
        </n-form-item>
        <n-form-item v-if="editTarget.summary" path="showType" label="展示版块">
          <n-select
            v-model:value="editTarget.showType"
            :options="showTypeList"
            placeholder="请选择展示的版块"
          />
        </n-form-item>
        <n-form-item path="status" label="是否展示在菜单">
          <n-switch
            v-model:value="editTarget.status"
            :checked-value="1"
            :unchecked-value="0"
            @change="changeEditStatus"
          />
        </n-form-item>
        <n-form-item label="内容编辑">
          <RichTextEditor ref="editRef" :content="editTarget.content"></RichTextEditor>
        </n-form-item>
      </n-form>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import type { FormRules, FormInst } from 'naive-ui';
import type { Page, Menu } from '@/types';
import { savePage, searchPage, searchMenu, deletePage } from '@/apis';
const message = useMessage();
const dialog = useDialog();
// 查找部分的变量
const searchRules: FormRules = {};
const searchFormRef = ref(null);
const searchTarget = ref<Page>({});
const pages = ref({
  page: 1,
  size: 10,
  total: 0,
});

// 编辑部分的变量
const editRules: FormRules = {
  title: [
    {
      required: true,
      message: '请输入文章标题',
    },
  ],
  menuId: [
    {
      required: true,
      message: '请选择子菜单',
    },
  ],
};
const editFormRef = ref<FormInst | null>(null);
const editTarget = ref<Page>({});
const drawerVisible = ref<boolean>(false);
const editRef = ref();

const tableData = ref<Page[]>([]);
const columns = [
  {
    title: '文章标题',
    key: 'title',
    width: '200px',
  },
  {
    title: '菜单',
    key: 'menuId',
    width: '100px',
  },
  {
    title: '展示图',
    key: 'coverImage',
    width: '100px',
  },
  {
    title: '首页展示',
    key: 'summary',
  },
  {
    title: '展示位置',
    key: 'showType',
    width: '150px',
  },
  {
    title: '菜单展示',
    key: 'status',
  },
  {
    title: '更新时间',
    key: 'updateTime',
    width: '200px',
  },
  {
    title: '操作',
    key: 'actions',
    width: '150px',
    fixed: 'right',
  },
];

const search = () => {
  pageChange(1);
};
const pageChange = (page: number) => {
  pages.value.page = page;
  searchData();
};
const editRow = (row: Page) => {
  const showType = row.showType ? row.showType : null;
  editTarget.value = { ...row, showType };
  drawerVisible.value = true;
};
const delRow = (row: Page) => {
  const id = row.id;
  dialog.warning({
    title: '警告',
    content: '你确定删除文章？',
    positiveText: '确定',
    negativeText: '取消',
    draggable: true,
    onPositiveClick: () => {
      //添加删除接口
      console.log('delRow', id);
      deletePage(id!).then((data) => {
        if (data.code === 0) {
          message.success('删除成功！');
          // 判断当前页是否还有数据，没有则跳到上一页
          if (tableData.value.length === 1 && pages.value.page > 1) {
            pageChange(pages.value.page - 1);
          } else {
            pageChange(pages.value.page);
          }
        }
      });
    },
  });
};
const searchData = async () => {
  const params = {
    page: pages.value.page,
    size: pages.value.size,
    menuId: searchTarget.value.menuId,
    searchWord: searchTarget.value.searchWord,
  };
  const data = await searchPage(params);
  if (data.code === 0) {
    tableData.value = data.data ? data.data.records : [];
    pages.value.total = data.data ? data.data.total! : 0;
  }
};
const add = () => {
  editTarget.value = {};
  drawerVisible.value = true;
};
const submit = () => {
  editTarget.value.content = editRef.value.getContent();

  editFormRef.value?.validate((errors) => {
    if (!errors) {
      console.log('submit', editTarget.value);
      //添加新增内容接口
      savePage(editTarget.value).then((data) => {
        if (data.code === 0) {
          message.success('保存成功！');
          // 如果是新增则返回到第一页
          if (editTarget.value.id) {
            pageChange(pages.value.page);
          } else {
            pageChange(1);
          }
        }
        closed();
      });
    }
  });
};
const changeEditStatus = () => {
  if (!editTarget.value.status) {
    editTarget.value.summary = 0;
  }
};
const changeEditSummary = () => {
  if (editTarget.value.summary) {
    editTarget.value.status = 1;
  } else {
    editTarget.value.showType = null;
  }
};
const changeShowStatus = (type: string, row: Page) => {
  let { summary, status, showType } = row;
  if (type === 'summary') {
    if (summary) {
      status = 1;
    } else {
      showType = null;
    }
  } else {
    if (!status) {
      summary = 0;
      showType = null;
    }
  }

  const params = Object.assign({}, row, { status, summary, showType });
  savePage(params).then((data) => {
    if (data.code === 0) {
      message.success('修改成功！');
      // 如果是新增则返回到第一页
      pageChange(pages.value.page);
    }
  });
};
const cancel = () => {
  closed();
};
const closed = () => {
  drawerVisible.value = false;
  editTarget.value = {};
};
const serachMenuName = (row) => {
  // 从菜单内找到对应的
  let targetMenuName: string;
  const resolveMenu = (menus: Menu[]) => {
    for (let i = 0; i < menus.length; i++) {
      const menu = menus[i];
      if (menu.id == row.menuId) {
        targetMenuName = menu.name;
        break;
      } else {
        if (menu.children && menu.children.length > 0) {
          resolveMenu(menu.children);
        }
      }
    }
  };
  resolveMenu(menuList.value);
  return targetMenuName;
};
const subMenuList = ref<{ value?: number; label?: string }[]>([]);
const showTypeList = ref<{ value?: number; label?: string }[]>([
  { value: 1, label: '首版Banner图' },
  { value: 2, label: '首版列表' },
  { value: 3, label: '二版Banner图' },
  { value: 4, label: '二版列表' },
]);
const menuList = ref<Menu[]>([]);
const resolveMenu = (menuList: Menu[]) => {
  menuList.map((menu) => {
    if (menu.children && menu.children.length > 0) {
      resolveMenu(menu.children);
    } else {
      if (menu.menuType === 'sub') subMenuList.value.push({ value: menu.id, label: menu.name });
    }
  });
};
const getAllSubMenu = async () => {
  const data = await searchMenu();
  menuList.value = data.data!;
  resolveMenu(data.data!);
};
onMounted(async () => {
  await getAllSubMenu();
  await searchData();
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
