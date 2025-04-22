<!--
  功能：菜单的维护
  作者：disonlv
  邮箱：disonlv@outlook.com
  时间：2025年04月10日 19:40:42
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <n-flex vertical style="height: 100%">
    <n-card class="add-menu">
      <n-space justify="space-between">
        <n-button type="primary" @click="add">新增菜单</n-button>
        <n-button style="margin-left: auto" type="primary" @click="() => sortLink()">排序</n-button>
      </n-space>
    </n-card>
    <n-card class="menu-tree">
      <CTable :columns="columns" :table-data="menuList" :row-key="(row) => row.id">
        <template #actions="{ row }">
          <n-space>
            <n-button strong tertiary size="small" @click="editMenu(row)">编辑</n-button>
            <n-button strong tertiary size="small" @click="delMenu(row)">删除</n-button>
          </n-space>
        </template>
        <template #menuType="{ row }">
          {{ menuTypeOptions.find((menu) => menu.value === row.menuType)?.label }}
        </template>
      </CTable>
    </n-card>
  </n-flex>
  <n-drawer
    v-model:show="drawerVisible"
    :width="500"
    placement="right"
    :on-esc="closed"
    :on-mask-click="() => closed()"
  >
    <n-drawer-content>
      <template #header>
        {{ editTarget?.id ? '编辑菜单' : '新增菜单' }}
      </template>
      <template #footer>
        <n-space>
          <n-button @click="cancel">取消</n-button>
          <n-button type="primary" @click="submit">保存</n-button>
        </n-space>
      </template>
      <n-form ref="editFormRef" :model="editTarget" :rules="editRules">
        <n-form-item path="name" label="菜单名称">
          <n-input v-model:value="editTarget.name" placeholder="请输入菜单名称" />
        </n-form-item>
        <n-form-item path="menuType" label="菜单类型">
          <n-select
            v-model:value="editTarget.menuType"
            :options="menuTypeOptions"
            placeholder="请选择父级菜单"
          />
        </n-form-item>
        <template v-if="editTarget?.menuType == 'sub'">
          <n-form-item path="parentId" label="父级菜单">
            <n-select
              v-model:value="editTarget.parentId"
              :options="parendMenuOptions"
              placeholder="请选择父级菜单"
            />
          </n-form-item>
        </template>
        <!-- <n-form-item path="orderNum" label="展示排序">
          <n-input-number v-model:value="editTarget.orderNum" clearable placeholder="请输入排序" />
        </n-form-item> -->
      </n-form>
    </n-drawer-content>
  </n-drawer>
  <n-modal v-model:show="sortVisible">
    <n-card
      style="width: 1000px"
      title="排序"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <CTable :columns="columns" :table-data="sortList" :flex-height="false">
        <template #actions="{ row }">
          <n-space>
            <n-button
              strong
              tertiary
              size="small"
              :disabled="row.id === sortList[0].id"
              @click="toTop(row)"
              >置顶
            </n-button>
            <n-button
              strong
              tertiary
              size="small"
              :disabled="row.id === sortList[0].id"
              @click="upSort(row)"
              >上移</n-button
            >
            <n-button
              strong
              tertiary
              size="small"
              :disabled="row.id === sortList[sortList.length - 1].id"
              @click="downSort(row)"
              >下移</n-button
            >
            <n-button
              strong
              tertiary
              size="small"
              :disabled="row.id === sortList[sortList.length - 1].id"
              @click="toBottom(row)"
              >置底</n-button
            >
          </n-space>
        </template>
      </CTable>
      <template #footer>
        <n-flex justify="end">
          <n-button type="primary" @click="submitSort">确定</n-button>
          <n-button @click="sortVisible = false">取消</n-button>
        </n-flex>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import type { FormRules, FormInst } from 'naive-ui';
import type { Menu } from '@/types';
import { searchMenu, deleteMenu, saveMenu, sortMenu } from '@/apis/admin';
const menuList = ref<Menu[]>([]);
const parendMenuOptions = ref<{ label: string; value: number }[]>();
const columns = [
  {
    title: '菜单名称',
    key: 'name',
  },
  {
    title: '菜单类型',
    key: 'menuType',
  },
  // {
  //   title: '展示顺序',
  //   key: 'orderNum',
  // },
  {
    title: '操作',
    key: 'actions',
  },
];

const menuTypeOptions = [
  {
    label: '主菜单',
    value: 'main',
  },
  {
    label: '子菜单',
    value: 'sub',
  },
];

const drawerVisible = ref<boolean>(false);

const editFormRef = ref<FormInst | null>(null);
const basicEditRules: FormRules = {
  name: {
    required: true,
    message: '请输入菜单名称',
    trigger: 'blur',
  },
  menuType: {
    required: true,
    message: '请选择菜单类型',
    trigger: 'blur',
  },
};
const editRules = computed(() => {
  return editTarget.value.menuType === 'sub'
    ? {
        ...basicEditRules,
        parentId: {
          required: true,
          message: '请选择父级菜单',
          trigger: 'blur',
          validator: (rule, value: number) => {
            if (!value) {
              return new Error('请选择父级菜单');
            }
            return true;
          },
        },
      }
    : basicEditRules;
});
const editTarget = ref<Menu>({
  // @ts-expect-error 此处忽略类型检查，新增不用id
  id: null,
  name: '',
  menuType: 'main',
  // @ts-expect-error 此处忽略类型检查，新增不用id
  parentId: null,
});
const message = useMessage();
const dialog = useDialog();
const editMenu = (menu: Menu) => {
  drawerVisible.value = true;
  editTarget.value = JSON.parse(JSON.stringify(menu));
};
const add = () => {
  editTarget.value = {
    name: '',
    menuType: 'main',
    orderNum: 0,
    // @ts-expect-error 此处忽略类型检查，新增不用id
    id: null,
  };
  drawerVisible.value = true;
};
const delMenu = ({ id }: Menu) => {
  dialog.warning({
    title: '警告',
    content: '你确定删除菜单？',
    positiveText: '确定',
    negativeText: '取消',
    draggable: true,
    onPositiveClick: () => {
      deleteMenu(id!).then((data) => {
        if (data.code === 0) {
          message.success('删除成功！');
          searchData();
        }
      });
    },
  });
};

const sortVisible = ref(false);
const sortList = ref<Menu[]>([]);
const sortLink = () => {
  sortList.value = JSON.parse(JSON.stringify(menuList.value));
  sortVisible.value = true;
};
const toTop = (row: Menu) => {
  //匹配到当前列并将当前列移动到数据列表的最顶端
  const index = sortList.value.findIndex((item) => item.id === row.id);
  sortList.value.splice(index, 1);
  sortList.value.unshift(row);
};
const toBottom = (row: Menu) => {
  //匹配到当前列并将当前列移动到数据列表的最底端
  const index = sortList.value.findIndex((item) => item.id === row.id);
  sortList.value.splice(index, 1);
  sortList.value.push(row);
};
const upSort = (row: Menu) => {
  //匹配到当前列并将当前列向上移动一列
  const index = sortList.value.findIndex((item) => item.id === row.id);
  sortList.value.splice(index, 1);
  sortList.value.splice(index - 1, 0, row);
};
const downSort = (row: Menu) => {
  //匹配到当前列并将当前列向下移动一列
  const index = sortList.value.findIndex((item) => item.id === row.id);
  sortList.value.splice(index, 1);
  sortList.value.splice(index + 1, 0, row);
};
const submitSort = async () => {
  const params = sortList.value.map(({ id }, index) => ({
    id,
    orderNum: index,
  }));
  const res = await sortMenu(params);
  if (res.code === 0) {
    message.success('修改排序成功！');
    sortVisible.value = false;
    searchData();
  }
};
const searchData = () => {
  searchMenu().then((data) => {
    if (data.code === 0) {
      menuList.value = data?.data ? data.data : [];
      parendMenuOptions.value = data.data?.map((item) => {
        return { label: item.name!, value: item.id! };
      });
    }
  });
};
const cancel = () => {
  drawerVisible.value = false;
};
const submit = () => {
  editFormRef.value?.validate((error) => {
    if (error) {
      return;
    }
    const params = Object.assign({}, { id: null, parentId: 0 }, editTarget.value);
    saveMenu(params).then((data) => {
      if (data.code === 0) {
        message.success(editTarget.value?.id ? '修改成功' : '新增菜单成功');
        drawerVisible.value = false;
        searchData();
      }
    });
  });
};
const closed = () => {
  editTarget.value = {} as Menu;
};
searchData();
</script>

<style scoped lang="scss">
.menu-tree {
  flex: 1;
}
</style>
