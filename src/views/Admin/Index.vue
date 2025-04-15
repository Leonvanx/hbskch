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
  <n-flex vertical style="width: 100%; height: 100%">
    <n-flex>
      <n-card>
        <template #header>美术资源</template>
        <n-space>
          <n-card style="width: fit-content">
            <CommonUpload
              :key="resourceObj.logo"
              v-model:fileUrl="resourceObj.logo"
              :max="1"
              @uploadSuccess="(url: string) => updateData(url, 'logo')"
            ></CommonUpload>
            <template #footer>LOGO</template>
          </n-card>
          <n-card style="width: fit-content">
            <CommonUpload
              :key="resourceObj.topbg"
              v-model:fileUrl="resourceObj.topbg"
              :max="1"
              @uploadSuccess="(url: string) => updateData(url, 'topbg')"
            ></CommonUpload>
            <template #footer>顶部背景图</template>
          </n-card>
          <n-card style="width: fit-content">
            <CommonUpload
              :key="resourceObj.searchPC"
              v-model:fileUrl="resourceObj.searchPC"
              :max="1"
              @uploadSuccess="(url: string) => updateData(url, 'searchPC')"
            ></CommonUpload>
            <template #footer>搜索框背景图(PC)</template>
          </n-card>
          <n-card style="width: fit-content">
            <CommonUpload
              :key="resourceObj.searchH5"
              v-model:fileUrl="resourceObj.searchH5"
              :max="1"
              @uploadSuccess="(url: string) => updateData(url, 'searchH5')"
            ></CommonUpload>
            <template #footer>搜索框背景图(移动端)</template>
          </n-card>
          <n-card style="width: fit-content">
            <CommonUpload
              :key="resourceObj.searchBt"
              v-model:fileUrl="resourceObj.searchBt"
              :max="1"
              @uploadSuccess="(url: string) => updateData(url, 'searchBt')"
            ></CommonUpload>
            <template #footer>底部背景图</template>
          </n-card>
          <n-card style="width: fit-content">
            <CommonUpload
              :key="resourceObj.qrcode"
              v-model:fileUrl="resourceObj.qrcode"
              :max="1"
              @uploadSuccess="(url: string) => updateData(url, 'qrcode')"
            ></CommonUpload>
            <template #footer>底部二维码</template>
          </n-card>
        </n-space>
        <n-form inline style="margin-top: 20px">
          <n-form-item label="顶部中文名" style="width: 33%">
            <n-input
              v-model:value="resourceObj.zhTitle"
              placeholder="请输入中文名"
              @change="(val) => updateData(val, 'zhTitle')"
            ></n-input>
          </n-form-item>
          <n-form-item label="顶部英文名" style="width: 33%">
            <n-input
              v-model:value="resourceObj.enTitle"
              placeholder="请输入英文名"
              @change="(val) => updateData(val, 'enTitle')"
            ></n-input>
          </n-form-item>
          <n-form-item label="顶部描述" style="width: 33%">
            <n-input
              v-model:value="resourceObj.desc"
              placeholder="请输入描述"
              @change="(val) => updateData(val, 'desc')"
            ></n-input>
          </n-form-item>
        </n-form>
      </n-card>
    </n-flex>
    <n-card title="友情链接" style="flex: 1">
      <template #header-extra>
        <n-button type="primary" @click="() => addLink()">添加</n-button>
      </template>
      <CTable :columns="linkColumns" :table-data="linkList" :flex-height="false">
        <template #actions="{ row }">
          <n-space>
            <n-button strong tertiary size="small" type="primary" @click="addLink(row)"
              >修改</n-button
            >
            <n-button strong tertiary size="small" @click="delLink(row)">删除</n-button>
          </n-space>
        </template>
      </CTable>
    </n-card>
  </n-flex>
  <n-modal v-model:show="modalVisible" @mask-click="cancel">
    <n-card
      style="width: 600px"
      title="修改密码"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
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
import {
  searchFriendLink,
  updateFriendLink,
  deleteFriendLink,
  searchResource,
  updateResource,
} from '@/apis/admin';
const linkList = ref<Link[]>([]);
const modalVisible = ref(false);
const linkFormRef = ref<FormInst | null>();
const urlForm = ref<Link>({ name: '', url: '', orderNum: 1 });
const message = useMessage();
const dialog = useDialog();
const resourceObj = ref({
  logo: '',
  topbg: '',
  searchPC: '',
  searchH5: '',
  searchBt: '',
  zhTitle: '',
  enTitle: '',
  desc: '',
  qrcode: '',
});
const getAllResourceList = async () => {
  const res = await searchResource();
  if (res.code === 0) {
    resourceObj.value.logo = res.data?.find((item) => item.code === 'logo')?.url || '';
    resourceObj.value.topbg = res.data?.find((item) => item.code === 'topbg')?.url || '';
    resourceObj.value.searchPC = res.data?.find((item) => item.code === 'searchPC')?.url || '';
    resourceObj.value.searchH5 = res.data?.find((item) => item.code === 'searchH5')?.url || '';
    resourceObj.value.searchBt = res.data?.find((item) => item.code === 'searchBt')?.url || '';
    resourceObj.value.zhTitle = res.data?.find((item) => item.code === 'zhTitle')?.name || '';
    resourceObj.value.enTitle = res.data?.find((item) => item.code === 'enTitle')?.name || '';
    resourceObj.value.desc = res.data?.find((item) => item.code === 'desc')?.name || '';
    resourceObj.value.qrcode = res.data?.find((item) => item.code === 'qrcode')?.url || '';
  }
};
const updateData = async (value: string, code: string) => {
  // 存储对应code的url到数据库中
  const res = await updateResource({
    name: code,
    url: value,
    code,
  });
  if (res.code === 0) {
    // message.success('');
  }
};
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
getAllResourceList();
getLinkList();
</script>

<style scoped lang="scss"></style>
