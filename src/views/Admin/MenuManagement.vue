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
  <n-flex vertical>
    <n-card class="add-menu">
      <n-button type="primary">新增菜单</n-button>
    </n-card>
    <n-card class="menu-tree">
      <CTable :columns="columns" :data="menuList" :row-key="(row) => row.id">
        <template #actions="{ row }">
          <n-space>
            <n-button strong tertiary size="small" @click="editMenu(row)">编辑</n-button>
            <n-button strong tertiary size="small" @click="delMenu(row)">删除</n-button>
          </n-space>
        </template>
      </CTable>
    </n-card>
  </n-flex>
  <n-drawer v-model:show="drawerVisible" :width="500" placement="right" :on-esc="closed" :on-mask-click="() => closed()">
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
          <n-input v-model:value="editTarget.name" placeholder="请输入文章标题" />
        </n-form-item>
        <n-form-item path="menuType" label="菜单类型">
          <n-select v-model:value="editTarget.menuType" :options="menuTypeOptions" placeholder="请选择父级菜单" />
        </n-form-item>
        <template v-if="editTarget.menuType == 'sub'">
          <n-form-item path="parentId" label="父级菜单">
            <n-select v-model:value="editTarget.parentId" :options="parentMenuList" placeholder="请选择父级菜单" />
          </n-form-item>
        </template>
        <n-form-item path="orderNum" label="顺序">
          <n-input-number v-model:value="editTarget.orderNum" clearable placeholder="请输入排序" />
        </n-form-item>
      </n-form>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import type { FormRules, FormInst } from 'naive-ui';

interface Menu {
  fixed?: number;
  id?: number;
  name?: string;
  orderNum?: number;
  parentId?: number;
  status?: number;
  children?: Menu[];
  menuType?: string;
}
const menuList = ref<Menu[]>([
  {
    children: [
      {
        children: [],
        fixed: 0,
        id: 2,
        menuType: 'sub',
        name: '子菜单',
        orderNum: 0,
        parentId: 1,
        status: 0,
      },
    ],
    fixed: 0,
    id: 1,
    menuType: 'main',
    name: '主菜单',
    orderNum: 0,
    parentId: 0,
    status: 0,
  },
]);
const parentMenuList = computed(() => {
  return menuList.value.map((menu: Menu) => ({
    label: menu.name,
    value: menu.id,
  }));
});
const columns = [
  {
    title: '菜单名称',
    key: 'name',
  },
  {
    title: '菜单类型',
    key: 'menuType',
  },
  {
    title: '顺序',
    key: 'orderNum',
  },
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
const editRules: FormRules = {};
const editTarget = ref<Menu>({});

const editMenu = (menu: Menu) => {
  drawerVisible.value = true;
  editTarget.value = JSON.parse(JSON.stringify(menu));
};
const delMenu = () => {};
</script>

<style scoped lang="scss">
.menu-tree {
  flex: 1;
}
</style>
