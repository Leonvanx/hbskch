<!--
  功能：功能描述
  作者：renzj
  邮箱：591738878@qq.com
  时间：2025年04月08日 22:47:14
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <n-flex vertical>
    <n-flex>
      <n-card>
        <template #header>美术资源</template>
        <CommonUpload :max="1"></CommonUpload>
      </n-card>
    </n-flex>
    <n-card title="友情链接" style="min-height: 300px">
      <template #header-extra>
        <n-button type="primary" @click="() => addLink()">添加</n-button>
      </template>
      <CTable :flexHeight="false" :columns="linkColumns" :table-data="linkList">
        <template #actions="{ row }">
          <n-space>
            <n-button strong tertiary size="small" type="primary" @click="addLink(row)">修改</n-button>
            <n-button strong tertiary size="small" @click="delLink(row)">删除</n-button>
          </n-space>
        </template>
      </CTable>
    </n-card>
  </n-flex>
  <n-modal v-model:show="modalVisible" @mask-click="cancel">
    <n-card style="width: 600px" title="修改密码" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <n-form ref="linkFormRef" :model="urlForm" :rules="rules" label-width="100px">
        <n-form-item label="链接名称" path="name">
          <n-input v-model:value="urlForm.name" placeholder="请输入链接名称"></n-input>
        </n-form-item>
        <n-form-item label="链接地址" path="url">
          <n-input v-model:value="urlForm.url" placeholder="请输入链接地址"></n-input>
        </n-form-item>
        <!-- <n-form-item label="显示顺序" path="orderNum">
          <n-input-number v-model:value="urlForm.orderNum" clearable placeholder="请输入显示顺序"></n-input-number>
        </n-form-item> -->
      </n-form>
      <template #footer>
        <n-flex justify="end">
          <n-button type="primary" @click="submit">确定</n-button>
          <n-button @click="modalVisible = false">取消</n-button>
        </n-flex>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import type { Link } from '@/types';
import type { FormRules, FormInst } from 'naive-ui';
import { searchFriendLink, updateFriendLink, deleteFriendLink } from '@/apis/admin';
// const resourceMap = ref(new Map<string, Resource[]>());
const linkList = ref<Link[]>([]);
const modalVisible = ref(false);
const linkFormRef = ref<FormInst | null>();
const urlForm = ref<Link>({ name: '', url: '', orderNum: 1 });
const message = useMessage();
const dialog = useDialog();
// const getResourceListByCode = async (code: string) => {
//   const res = await searchResource(code);
//   if (res.code === 0) {
//     resourceMap.value.set(code, res.data);
//   }
// };
const getLinkList = async () => {
  const res = await searchFriendLink();
  if (res.code === 0) {
    linkList.value = res.data ? res.data : [];
  }
};
const delLink = ({ id }: Link) => {
  // 打开弹窗
  dialog.warning({
    title: '警告',
    content: '你确定删除链接？',
    positiveText: '确定',
    negativeText: '取消',
    draggable: true,
    onPositiveClick: async () => {
      //添加删除接口
      const res = await deleteFriendLink(id!);
      if (res.code === 0) {
        message.success('删除成功！');
        modalVisible.value = false;
        getLinkList();
      }
    },
  });
};
const cancel = () => {};
const rules: FormRules = {
  name: {
    required: true,
    message: '请输入链接名称',
    trigger: 'blur',
  },
  url: {
    required: true,
    message: '请输入链接地址',
    trigger: 'blur',
  },
};
const submit = async () => {
  const params = {
    ...urlForm.value,
  };
  linkFormRef.value?.validate(async (error) => {
    if (!error) {
      const res = await updateFriendLink(params);
      if (res.code === 0) {
        modalVisible.value = false;
        message.success(`${params.id ? '修改' : '添加'}成功`);
        getLinkList();
      }
    }
  });
};
const addLink = (row?: Link) => {
  if (row) {
    const { name, url, orderNum, id } = row;
    urlForm.value = { name, url, orderNum, id };
  } else {
    urlForm.value = { name: '', url: '', orderNum: 1 };
  }
  modalVisible.value = true;
};
const linkColumns = [
  {
    title: '链接名称',
    key: 'name',
  },
  {
    title: '链接地址',
    key: 'url',
  },
  {
    title: '操作',
    key: 'actions',
  },
];
getLinkList();
</script>

<style scoped lang="scss"></style>
