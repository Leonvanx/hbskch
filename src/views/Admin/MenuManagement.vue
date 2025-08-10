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
        <n-button type="primary" @click="add">
          <template #icon>
            <n-icon>
              <i-mdi-add style="font-size: 1.1rem; color: #fff" />
            </n-icon>
          </template>
          新增</n-button
        >
        <n-button style="margin-left: auto" type="primary" @click="() => sortTabLink()"
          ><template #icon>
            <n-icon>
              <i-iconoir-sort style="font-size: 1.1rem; color: #fff" />
            </n-icon> </template
          >Tab排序</n-button
        >
        <n-button style="margin-left: auto" type="primary" @click="() => sortLink()"
          ><template #icon>
            <n-icon>
              <i-iconoir-sort style="font-size: 1.1rem; color: #fff" />
            </n-icon> </template
          >排序</n-button
        >
      </n-space>
    </n-card>
    <n-card class="menu-tree">
      <CTable :columns="columns" :table-data="menuList" :row-key="(row) => row.id">
        <template #actions="{ row }">
          <n-space>
            <n-button strong tertiary size="small" title="编辑" @click="editMenu(row)">
              <template #icon>
                <n-icon>
                  <i-iconoir-edit style="font-size: 1.1rem; color: #000" />
                </n-icon>
              </template>
            </n-button>
            <n-button strong tertiary size="small" title="删除" @click="delMenu(row)">
              <template #icon>
                <n-icon>
                  <i-material-symbols-light-delete style="font-size: 1.1rem; color: #000" />
                </n-icon>
              </template>
            </n-button>
          </n-space>
        </template>
        <template #menuType="{ row }">
          {{ menuTypeOptions.find((menu) => menu.value === row.menuType)?.label }}
        </template>
        <template #showType="{ row }">
          {{ showTypeOptions.find((menu) => menu.value === row.showType)?.label }}
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
        <n-form-item path="showType" label="展示类型">
          <n-select
            v-model:value="editTarget.showType"
            :options="showTypeOptions"
            placeholder="请选择展示类型"
            clearable
            @change="changeShowType"
          /> </n-form-item
        ><n-form-item v-if="editTarget.showType == 1" path="tabNum" label="展示Tab">
          <n-select
            v-model:value="editTarget.tabNum"
            :options="tabOptions"
            placeholder="请选择展示Tab类型"
            clearable
          />
        </n-form-item>
      </n-form>
    </n-drawer-content>
  </n-drawer>
  <n-modal v-model:show="sortTabVisible">
    <n-card
      style="width: 1000px"
      title="Tab排序"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <CTable
        :columns="columns"
        :table-data="sortTabList"
        :flex-height="false"
        :row-key="(row) => row.id"
      >
        <template #menuType="{ row }">
          {{ menuTypeOptions.find((menu) => menu.value === row.menuType)?.label }}
        </template>
        <template #showType="{ row }">
          {{ showTypeOptions.find((menu) => menu.value === row.showType)?.label }}
        </template>
        <template #actions="{ row }">
          <n-space>
            <n-button
              strong
              tertiary
              title="在当前层级置顶"
              size="small"
              :disabled="row.id === 1 || row.id === 2 || isTabDisable(row, 'up')"
              @click="toTabTop(row)"
              ><template #icon>
                <n-icon>
                  <i-iconoir-fast-arrow-up style="font-size: 1.1rem; color: #000" />
                </n-icon>
              </template>
            </n-button>
            <n-button
              strong
              tertiary
              title="在当前层级上移"
              size="small"
              :disabled="row.id === 1 || row.id === 2 || isTabDisable(row, 'up')"
              @click="upTabSort(row)"
              ><template #icon>
                <n-icon>
                  <i-iconoir-arrow-up style="font-size: 1.1rem; color: #000" />
                </n-icon> </template
            ></n-button>
            <n-button
              strong
              tertiary
              title="在当前层级下移"
              size="small"
              :disabled="row.id === 1 || row.id === 2 || isTabDisable(row, 'down')"
              @click="downTabSort(row)"
              ><template #icon>
                <n-icon>
                  <i-iconoir-arrow-down style="font-size: 1.1rem; color: #000" />
                </n-icon> </template
            ></n-button>
            <n-button
              strong
              tertiary
              title="在当前层级置底"
              size="small"
              :disabled="row.id === 1 || row.id === 2 || isTabDisable(row, 'down')"
              @click="toTabBottom(row)"
              ><template #icon>
                <n-icon>
                  <i-iconoir-fast-arrow-down style="font-size: 1.1rem; color: #000" />
                </n-icon> </template
            ></n-button>
          </n-space>
        </template>
      </CTable>
      <template #footer>
        <n-flex justify="end">
          <n-button type="primary" @click="submitTabSort">确定</n-button>
          <n-button @click="sortTabVisible = false">取消</n-button>
        </n-flex>
      </template>
    </n-card>
  </n-modal>
  <n-modal v-model:show="sortVisible">
    <n-card
      style="width: 1000px"
      title="排序"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <CTable
        :columns="columns"
        :table-data="sortList"
        :flex-height="false"
        :row-key="(row) => row.id"
      >
        <template #menuType="{ row }">
          {{ menuTypeOptions.find((menu) => menu.value === row.menuType)?.label }}
        </template>
        <template #showType="{ row }">
          {{ showTypeOptions.find((menu) => menu.value === row.showType)?.label }}
        </template>
        <template #actions="{ row }">
          <n-space>
            <n-button
              strong
              tertiary
              title="在当前层级置顶"
              size="small"
              :disabled="row.id === sortList[0].id || isDisable(row, 'up')"
              @click="toTop(row)"
              ><template #icon>
                <n-icon>
                  <i-iconoir-fast-arrow-up style="font-size: 1.1rem; color: #000" />
                </n-icon>
              </template>
            </n-button>
            <n-button
              strong
              tertiary
              title="在当前层级上移"
              size="small"
              :disabled="row.id === sortList[0].id || isDisable(row, 'up')"
              @click="upSort(row)"
              ><template #icon>
                <n-icon>
                  <i-iconoir-arrow-up style="font-size: 1.1rem; color: #000" />
                </n-icon> </template
            ></n-button>
            <n-button
              strong
              tertiary
              title="在当前层级下移"
              size="small"
              :disabled="row.id === sortList[sortList.length - 1].id || isDisable(row, 'down')"
              @click="downSort(row)"
              ><template #icon>
                <n-icon>
                  <i-iconoir-arrow-down style="font-size: 1.1rem; color: #000" />
                </n-icon> </template
            ></n-button>
            <n-button
              strong
              tertiary
              title="在当前层级置底"
              size="small"
              :disabled="row.id === sortList[sortList.length - 1].id || isDisable(row, 'down')"
              @click="toBottom(row)"
              ><template #icon>
                <n-icon>
                  <i-iconoir-fast-arrow-down style="font-size: 1.1rem; color: #000" />
                </n-icon> </template
            ></n-button>
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
import {
  searchMenu,
  searchMenuByTab,
  deleteMenu,
  saveMenu,
  sortMenu,
  sortTabMenu,
} from '@/apis/admin';
const menuList = ref<Menu[]>([]);
const parendMenuOptions = ref<{ label: string; value: number }[]>();
const showTypeOptions = [
  {
    label: '首页',
    value: 0,
  },
  {
    label: '文章列表',
    value: 1,
  },
  {
    label: '单独文章',
    value: 2,
  },
];
const tabOptions = [
  {
    label: '不展示',
    value: 0,
  },
  {
    label: '头版Tab',
    value: 1,
  },
  {
    label: '二版Tab',
    value: 2,
  },
];
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
    title: '展示类型',
    key: 'showType',
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
const changeShowType = (val: number) => {
  if (val != 1) {
    editTarget.value.tabNum = 0;
  }
};
const editFormRef = ref<FormInst | null>(null);
const basicEditRules: FormRules = {
  name: {
    required: true,
    message: '请输入菜单名称',
  },

  menuType: {
    required: true,
    message: '请选择菜单类型',
  },
  // showType: {
  //   required: true,
  //   message: '请选择菜单类型',
  // },
};
const editRules = computed(() => {
  return editTarget.value.menuType === 'sub'
    ? {
        ...basicEditRules,
        parentId: {
          required: true,
          message: '请选择父级菜单',
          trigger: 'blur,change',
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
  showType: 1,
});
const editTargetOld = ref<Menu>({
  // @ts-expect-error 此处忽略类型检查，新增不用id
  id: null,
  name: '',
  menuType: 'main',
  // @ts-expect-error 此处忽略类型检查，新增不用id
  parentId: null,
  showType: 1,
});
const message = useMessage();
const dialog = useDialog();
const editMenu = (menu: Menu) => {
  drawerVisible.value = true;
  editTarget.value = JSON.parse(JSON.stringify(menu));
  console.log('🚀 ~ editMenu ~ editTarget:', toRaw(editTarget.value));
  editTargetOld.value = JSON.parse(JSON.stringify(menu));
};
const add = () => {
  editTarget.value = {
    name: '',
    menuType: 'main',
    orderNum: 0,
    // @ts-expect-error 此处忽略类型检查，新增不用id
    id: null,
  };
  editTargetOld.value = {
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
const sortTabVisible = ref(false);
const sortList = ref<Menu[]>([]);
const sortTabList = ref<Menu[]>([]);
// 菜单排序
const sortLink = () => {
  sortList.value = JSON.parse(JSON.stringify(menuList.value));
  sortVisible.value = true;
};
// Tab标签排序
const sortTabLink = async () => {
  await searchTabData();
  sortTabVisible.value = true;
};
const toTop = (row: Menu) => {
  //匹配到当前列并将当前列移动到数据列表的最顶端
  if (row.menuType === 'main') {
    const index = sortList.value.findIndex((item) => item.id === row.id);
    sortList.value.splice(index, 1);
    sortList.value.unshift(row);
  } else {
    const indexRow = findParentMain(row);
    if (sortList.value[indexRow].children) {
      const index = sortList.value[indexRow].children.findIndex((item) => item.id === row.id);
      sortList.value[indexRow].children.splice(index, 1);
      sortList.value[indexRow].children.unshift(row);
    }
  }
};
const toBottom = (row: Menu) => {
  //匹配到当前列并将当前列移动到数据列表的最底端
  if (row.menuType === 'main') {
    const index = sortList.value.findIndex((item) => item.id === row.id);
    sortList.value.splice(index, 1);
    sortList.value.push(row);
  } else {
    const indexRow = findParentMain(row);
    if (sortList.value[indexRow].children) {
      const index = sortList.value[indexRow].children.findIndex((item) => item.id === row.id);
      sortList.value[indexRow].children.splice(index, 1);
      sortList.value[indexRow].children.push(row);
    }
  }
};
const upSort = (row: Menu) => {
  //匹配到当前列并将当前列向上移动一列
  if (row.menuType === 'main') {
    const index = sortList.value.findIndex((item) => item.id === row.id);
    sortList.value.splice(index, 1);
    sortList.value.splice(index - 1, 0, row);
  } else {
    const indexRow = findParentMain(row);
    if (sortList.value[indexRow].children) {
      const index = sortList.value[indexRow].children.findIndex((item) => item.id === row.id);
      if (index !== 0) {
        sortList.value[indexRow].children.splice(index, 1);
        sortList.value[indexRow].children.splice(index - 1, 0, row);
      }
    }
  }
};
const downSort = (row: Menu) => {
  //匹配到当前列并将当前列向下移动一列
  if (row.menuType === 'main') {
    const index = sortList.value.findIndex((item) => item.id === row.id);
    sortList.value.splice(index, 1);
    sortList.value.splice(index + 1, 0, row);
  } else {
    const indexRow = findParentMain(row);
    if (sortList.value[indexRow].children) {
      const index = sortList.value[indexRow].children.findIndex((item) => item.id === row.id);
      sortList.value[indexRow].children.splice(index, 1);
      sortList.value[indexRow].children.splice(index + 1, 0, row);
    }
  }
};
const toTabTop = (row: Menu) => {
  //匹配到当前列并将当前列移动到数据列表的最顶端
  const indexRow = findTabMain(row);
  if (sortTabList.value[indexRow].children) {
    const index = sortTabList.value[indexRow].children.findIndex((item) => item.id === row.id);
    sortTabList.value[indexRow].children.splice(index, 1);
    sortTabList.value[indexRow].children.unshift(row);
  }
};
const toTabBottom = (row: Menu) => {
  //匹配到当前列并将当前列移动到数据列表的最底端
  const indexRow = findTabMain(row);
  if (sortTabList.value[indexRow].children) {
    const index = sortTabList.value[indexRow].children.findIndex((item) => item.id === row.id);
    sortTabList.value[indexRow].children.splice(index, 1);
    sortTabList.value[indexRow].children.push(row);
  }
};
const upTabSort = (row: Menu) => {
  //匹配到当前列并将当前列向上移动一列
  const indexRow = findTabMain(row);
  if (sortTabList.value[indexRow].children) {
    const index = sortTabList.value[indexRow].children.findIndex((item) => item.id === row.id);
    if (index !== 0) {
      sortTabList.value[indexRow].children.splice(index, 1);
      sortTabList.value[indexRow].children.splice(index - 1, 0, row);
    }
  }
};
const downTabSort = (row: Menu) => {
  //匹配到当前列并将当前列向下移动一列
  const indexRow = findTabMain(row);
  if (sortTabList.value[indexRow].children) {
    const index = sortTabList.value[indexRow].children.findIndex((item) => item.id === row.id);
    sortTabList.value[indexRow].children.splice(index, 1);
    sortTabList.value[indexRow].children.splice(index + 1, 0, row);
  }
};
// 寻找对应父级
const findParentMain = (row: Menu) => {
  const index = sortList.value.findIndex((item) =>
    item.children && item.children.length > 0 ? item.children[0].parentId === row.parentId : false,
  );
  return index;
};
// 寻找所属Tab
const findTabMain = (row: Menu) => {
  const index = sortTabList.value.findIndex((item) =>
    item.children && item.children.length > 0 ? item.children[0].tabNum === row.tabNum : false,
  );
  return index;
};
// 判断children是否禁用
const isDisable = (row: Menu, flag: string) => {
  if (row.menuType === 'sub') {
    const index = sortList.value.findIndex((item) => item.id === row.parentId);
    return flag === 'up'
      ? sortList.value[index].children![0].id === row.id
      : sortList.value[index].children![sortList.value[index].children!.length - 1].id === row.id;
  } else {
    return false;
  }
};
// 判断Tab的children是否禁用
const isTabDisable = (row: Menu, flag: string) => {
  const index = sortTabList.value.findIndex((item) => item.id === row.tabNum);
  return flag === 'up'
    ? sortTabList.value[index].children![0].id === row.id
    : sortTabList.value[index].children![sortTabList.value[index].children!.length - 1].id ===
        row.id;
};
const submitSort = async () => {
  const params = [];
  for (let i = 0; i < sortList.value.length; i++) {
    params.push({ id: sortList.value[i].id, orderNum: i });
    if (sortList.value[i].children) {
      for (let l = 0; l < sortList.value[i].children!.length; l++) {
        if (sortList.value[i].children) {
          params.push({ id: sortList.value[i].children![l].id, orderNum: l });
        }
      }
    }
  }
  // const params = sortList.value.map(({ id }, index) => ({
  //   id,
  //   orderNum: index,
  // }));
  const res = await sortMenu(params);
  if (res.code === 0) {
    message.success('修改排序成功！');
    sortVisible.value = false;
    searchData();
  }
};
const submitTabSort = async () => {
  const params = [];
  for (let i = 0; i < sortTabList.value.length; i++) {
    params.push({ id: sortTabList.value[i].id, tabOrderNum: i });
    if (sortTabList.value[i].children) {
      for (let l = 0; l < sortTabList.value[i].children!.length; l++) {
        if (sortTabList.value[i].children) {
          params.push({ id: sortTabList.value[i].children![l].id, tabOrderNum: l });
        }
      }
    }
  }
  // const params = sortList.value.map(({ id }, index) => ({
  //   id,
  //   orderNum: index,
  // }));
  const res = await sortTabMenu(params);
  if (res.code === 0) {
    message.success('修改Tab排序成功！');
    sortTabVisible.value = false;
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
// Tab标签查询（加异步弹窗打开时做同步查询）
const searchTabData = async () => {
  sortTabList.value = [
    {
      id: 1,
      name: '展示标签1',
      tabNum: 1,
      menuType: 'main',
      showType: 0,
      children: [],
    },
    {
      id: 2,
      name: '展示标签2',
      tabNum: 1,
      menuType: 'main',
      showType: 0,
      children: [],
    },
  ];
  await searchMenuByTab({ tabId: 1 }).then((data) => {
    if (data.code === 0) {
      const dataFilter = data.data?.filter((item) => item.showType === 1) as Menu[];
      sortTabList.value[0].children = dataFilter ? dataFilter : [];
    }
  });
  await searchMenuByTab({ tabId: 2 }).then((data) => {
    if (data.code === 0) {
      const dataFilter = data.data?.filter((item) => item.showType === 1) as Menu[];
      sortTabList.value[1].children = dataFilter ? dataFilter : [];
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
    /**
     * 这段if else 逻辑有问题？
     */
    if (editTarget.value.menuType === 'main' && editTargetOld.value.menuType === 'sub') {
      editTarget.value.parentId = 0;
      editTarget.value.orderNum = menuList.value.length;
    }
    if (editTargetOld.value.menuType === 'main' && editTarget.value.menuType === 'sub') {
      for (let i = 0; i < menuList.value.length; i++) {
        if (menuList.value[i].id === editTarget.value.parentId) {
          editTarget.value.orderNum = menuList.value[i].children?.length;
        }
      }
    }
    saveMenu({ parentId: 0, ...editTarget.value }).then((data) => {
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
