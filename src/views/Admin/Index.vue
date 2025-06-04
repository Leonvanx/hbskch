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
          <!-- <n-card style="width: fit-content">
            <CommonUpload
              :key="resourceObj.searchPC"
              v-model:fileUrl="resourceObj.searchPC"
              :max="1"
              @uploadSuccess="(url: string) => updateData(url, 'searchPC')"
            ></CommonUpload>
            <template #footer>搜索框背景图(PC)</template>
          </n-card> -->
          <n-card style="width: fit-content">
            <CommonUpload
              :key="resourceObj.searchH5"
              v-model:fileUrl="resourceObj.searchH5"
              :max="1"
              @uploadSuccess="(url: string) => updateData(url, 'searchH5')"
            ></CommonUpload>
            <template #footer>中间窗帘</template>
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
        <n-form inline style="margin-top: 20px; flex-wrap: wrap">
          <n-form-item label="窗帘跳转url" style="width: 100%">
            <n-input
              v-model:value="resourceObj.jumpUrl"
              placeholder="请输入跳转url"
              @change="(val: string) => updateData(val, 'jumpUrl')"
            ></n-input>
          </n-form-item>
          <n-form-item label="顶部中文名" style="width: 30%">
            <n-input
              v-model:value="resourceObj.zhTitle"
              placeholder="请输入中文名"
              @change="(val: string) => updateData(val, 'zhTitle')"
            ></n-input>
          </n-form-item>
          <n-form-item label="顶部英文名" style="width: 30%">
            <n-input
              v-model:value="resourceObj.enTitle"
              placeholder="请输入英文名"
              @change="(val: string) => updateData(val, 'enTitle')"
            ></n-input>
          </n-form-item>
          <n-form-item label="顶部描述" style="width: 30%">
            <n-input
              v-model:value="resourceObj.desc"
              placeholder="请输入描述"
              @change="(val: string) => updateData(val, 'desc')"
            ></n-input>
          </n-form-item>
        </n-form>
      </n-card>
    </n-flex>
    <n-card title="中部友情链接" style="flex: 1">
      <template #header-extra>
        <n-space>
          <n-button type="primary" @click="() => sortLink('mid')"
            ><template #icon>
              <n-icon>
                <i-iconoir-sort style="font-size: 1.1rem; color: #fff" />
              </n-icon>
            </template>
            排序</n-button
          >
          <n-button type="primary" @click="() => addLinkMid()"
            ><template #icon>
              <n-icon>
                <i-mdi-add style="font-size: 1.1rem; color: #fff" />
              </n-icon> </template
            >添加</n-button
          >
        </n-space>
      </template>

      <CTable :columns="linkColumns" :table-data="linkListMid" :flex-height="false">
        <template #picUrl="{ row }">
          <template v-if="row.picUrl">
            <n-image :src="row.picUrl" width="50" height="50"></n-image>
          </template>
          <template v-else>
            <img src="@/assets/icons/default_image.svg" width="50" height="50" />
          </template>
        </template>
        <template #actions="{ row }">
          <n-space>
            <n-button title="修改" strong tertiary size="small" @click="addLinkMid(row)"
              ><template #icon>
                <n-icon>
                  <i-iconoir-edit style="font-size: 1.1rem; color: #000" />
                </n-icon>
              </template>
            </n-button>
            <n-button title="删除" strong tertiary size="small" @click="delLink(row)">
              <template #icon>
                <n-icon>
                  <i-material-symbols-light-delete style="font-size: 1.2rem; color: #000" />
                </n-icon>
              </template>
            </n-button>
          </n-space>
        </template>
      </CTable>
    </n-card>
    <n-card title="底部友情链接" style="flex: 1">
      <template #header-extra>
        <n-space>
          <n-button type="primary" @click="() => sortLink('bottom')"
            ><template #icon>
              <n-icon>
                <i-iconoir-sort style="font-size: 1.1rem; color: #fff" />
              </n-icon>
            </template>
            排序</n-button
          >
          <n-button type="primary" @click="() => addLinkBottom()"
            ><template #icon>
              <n-icon>
                <i-mdi-add style="font-size: 1.1rem; color: #fff" />
              </n-icon> </template
            >添加</n-button
          >
        </n-space>
      </template>
      <CTable :columns="linkColumnsWithoutBg" :table-data="linkListBottom" :flex-height="false">
        <template #actions="{ row }">
          <n-space>
            <n-button title="修改" strong tertiary size="small" @click="addLinkBottom(row)"
              ><template #icon>
                <n-icon>
                  <i-iconoir-edit style="font-size: 1.1rem; color: #000" />
                </n-icon>
              </template>
            </n-button>
            <n-button title="删除" strong tertiary size="small" @click="delLink(row)">
              <template #icon>
                <n-icon>
                  <i-material-symbols-light-delete style="font-size: 1.2rem; color: #000" />
                </n-icon>
              </template>
            </n-button>
          </n-space>
        </template>
      </CTable>
    </n-card>
    <n-card title="底部文案区域调整">
      <n-form>
        <n-form-item label="第一部分文案">
          <n-input
            v-model:value="resourceObj.part1Text"
            type="textarea"
            @change="(val: string) => updateData(val, 'text1')"
          ></n-input>
        </n-form-item>
        <n-form-item label="第二部分文案">
          <n-input
            v-model:value="resourceObj.part2Text"
            type="textarea"
            @change="(val: string) => updateData(val, 'text2')"
          ></n-input>
        </n-form-item>
        <n-form-item label="第三部分文案">
          <n-input
            v-model:value="resourceObj.part3Text"
            type="textarea"
            @change="(val: string) => updateData(val, 'text3')"
          ></n-input>
        </n-form-item>
      </n-form>
    </n-card>
  </n-flex>
  <n-modal v-model:show="modalVisibleMid" @mask-click="cancel">
    <n-card
      style="width: 600px"
      :title="urlForm.id ? '编辑中部链接' : '新增中部链接'"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-form ref="linkFormRef" :model="urlForm" :rules="rules" label-width="100px">
        <n-form-item label="链接名称" path="name">
          <n-input v-model:value="urlForm.name" placeholder="请输入链接名称"></n-input>
        </n-form-item>
        <n-form-item label="链接背景图" path="picUrl">
          <CommonUpload
            :key="urlForm.picUrl"
            v-model:fileUrl="urlForm.picUrl"
            :max="1"
          ></CommonUpload>
        </n-form-item>
        <n-form-item label="链接地址" path="url">
          <n-input v-model:value="urlForm.url" placeholder="请输入链接地址"></n-input>
        </n-form-item>
      </n-form>
      <template #footer>
        <n-flex justify="end">
          <n-button type="primary" @click="submit">确定</n-button>
          <n-button @click="modalVisibleMid = false">取消</n-button>
        </n-flex>
      </template>
    </n-card>
  </n-modal>
  <n-modal v-model:show="modalVisibleBottom" @mask-click="cancel">
    <n-card
      style="width: 600px"
      :title="urlForm.id ? '编辑底部链接' : '新增底部链接'"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-form ref="linkFormRef" :model="urlForm" :rules="rules" label-width="100px">
        <n-form-item label="链接名称" path="name">
          <n-input v-model:value="urlForm.name" placeholder="请输入链接名称"></n-input>
        </n-form-item>
        <!-- <n-form-item label="链接背景图" path="picUrl">
          <n-input v-model:value="urlForm.picUrl" placeholder="请输入链接英文名"></n-input>
        </n-form-item> -->
        <n-form-item label="链接地址" path="url">
          <n-input v-model:value="urlForm.url" placeholder="请输入链接地址"></n-input>
        </n-form-item>
      </n-form>
      <template #footer>
        <n-flex justify="end">
          <n-button type="primary" @click="submit">确定</n-button>
          <n-button @click="modalVisibleBottom = false">取消</n-button>
        </n-flex>
      </template>
    </n-card>
  </n-modal>
  <n-modal v-model:show="sortVisible">
    <n-card
      style="width: 80%"
      title="排序"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <CTable :columns="linkColumnsWithoutBg" :table-data="sortList" :flex-height="false">
        <template #actions="{ row }">
          <n-space>
            <n-button
              strong
              tertiary
              size="small"
              title="置顶"
              :disabled="row.id === sortList[0].id"
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
              size="small"
              title="上移"
              :disabled="row.id === sortList[0].id"
              @click="upSort(row)"
              ><template #icon>
                <n-icon>
                  <i-iconoir-arrow-up style="font-size: 1.1rem; color: #000" />
                </n-icon> </template
            ></n-button>
            <n-button
              strong
              tertiary
              size="small"
              title="下移"
              :disabled="row.id === sortList[sortList.length - 1].id"
              @click="downSort(row)"
              ><template #icon>
                <n-icon>
                  <i-iconoir-arrow-down style="font-size: 1.1rem; color: #000" />
                </n-icon> </template
            ></n-button>
            <n-button
              strong
              tertiary
              title="置底"
              size="small"
              :disabled="row.id === sortList[sortList.length - 1].id"
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
import type { Link } from '@/types';
import type { FormRules, FormInst } from 'naive-ui';
import {
  searchFriendLink,
  updateFriendLink,
  deleteFriendLink,
  sortFriendLink,
  searchResource,
  updateResource,
} from '@/apis/admin';
const linkListMid = ref<Link[]>([]);
const linkListBottom = ref<Link[]>([]);
const sortList = ref<Link[]>([]);
const modalVisibleMid = ref(false);
const modalVisibleBottom = ref(false);
const linkFormRef = ref<FormInst | null>();
const urlForm = ref<Link>({ name: '', url: '', orderNum: 1, picUrl: '' });
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
  footerPic: '',
  part1Text: '',
  part2Text: '',
  part3Text: '',
  jumpUrl: '',
});
const sortVisible = ref(false);
const getAllResourceList = async () => {
  const res = await searchResource();
  if (res.code === 0) {
    resourceObj.value.logo = res.data?.find((item) => item.code === 'logo')?.url || '';
    resourceObj.value.topbg = res.data?.find((item) => item.code === 'topbg')?.url || '';
    resourceObj.value.searchPC = res.data?.find((item) => item.code === 'searchPC')?.url || '';
    resourceObj.value.searchH5 = res.data?.find((item) => item.code === 'searchH5')?.url || '';
    resourceObj.value.searchBt = res.data?.find((item) => item.code === 'searchBt')?.url || '';
    resourceObj.value.zhTitle = res.data?.find((item) => item.code === 'zhTitle')?.url || '';
    resourceObj.value.enTitle = res.data?.find((item) => item.code === 'enTitle')?.url || '';
    resourceObj.value.desc = res.data?.find((item) => item.code === 'desc')?.url || '';
    resourceObj.value.qrcode = res.data?.find((item) => item.code === 'qrcode')?.url || '';
    resourceObj.value.footerPic = res.data?.find((item) => item.code === 'footerPic')?.url || '';
    resourceObj.value.part1Text = res.data?.find((item) => item.code === 'text1')?.url || '';
    resourceObj.value.part2Text = res.data?.find((item) => item.code === 'text2')?.url || '';
    resourceObj.value.part3Text = res.data?.find((item) => item.code === 'text3')?.url || '';
    resourceObj.value.jumpUrl = res.data?.find((item) => item.code === 'jumpUrl')?.url || '';
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
  const resMid = await searchFriendLink(1);
  if (resMid.code === 0) {
    linkListMid.value = resMid.data ? resMid.data : [];
  }
  const resBottom = await searchFriendLink(0);
  if (resBottom.code === 0) {
    linkListBottom.value = resBottom.data ? resBottom.data : [];
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
        modalVisibleMid.value = false;
        modalVisibleBottom.value = false;
        getLinkList();
      }
    },
  });
};
const cancel = () => {};
const sortLink = (posType: string) => {
  sortList.value = JSON.parse(
    JSON.stringify(posType === 'mid' ? linkListMid.value : linkListBottom.value),
  );
  sortVisible.value = true;
};
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
        modalVisibleMid.value = false;
        modalVisibleBottom.value = false;
        message.success(`${params.id ? '修改' : '添加'}成功`);
        getLinkList();
      }
    }
  });
};
const submitSort = async () => {
  const params = sortList.value.map(({ id }, index) => ({
    id,
    orderNum: index,
  }));
  const res = await sortFriendLink(params);
  if (res.code === 0) {
    message.success('修改排序成功！');
    sortVisible.value = false;
    getLinkList();
  }
};
const addLinkMid = (row?: Link) => {
  if (row) {
    const { name, url, orderNum, id, picUrl, posType } = row;
    urlForm.value = { name, url, orderNum, id, picUrl, posType };
  } else {
    urlForm.value = {
      name: '',
      url: '',
      orderNum: linkListMid.value.length,
      picUrl: '',
      posType: 1,
    };
  }
  modalVisibleMid.value = true;
};
const addLinkBottom = (row?: Link) => {
  if (row) {
    const { name, url, orderNum, id, picUrl, posType } = row;
    urlForm.value = { name, url, orderNum, id, picUrl, posType };
  } else {
    urlForm.value = {
      name: '',
      url: '',
      orderNum: linkListBottom.value.length,
      picUrl: '',
      posType: 0,
    };
  }
  modalVisibleBottom.value = true;
};
const linkColumns = [
  {
    title: '链接名称',
    key: 'name',
  },
  {
    title: '链接背景图',
    key: 'picUrl',
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
const linkColumnsWithoutBg = [
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
const toTop = (row: Link) => {
  //匹配到当前列并将当前列移动到数据列表的最顶端
  const index = sortList.value.findIndex((item) => item.id === row.id);
  sortList.value.splice(index, 1);
  sortList.value.unshift(row);
};
const toBottom = (row: Link) => {
  //匹配到当前列并将当前列移动到数据列表的最底端
  const index = sortList.value.findIndex((item) => item.id === row.id);
  sortList.value.splice(index, 1);
  sortList.value.push(row);
};
const upSort = (row: Link) => {
  //匹配到当前列并将当前列向上移动一列
  const index = sortList.value.findIndex((item) => item.id === row.id);
  sortList.value.splice(index, 1);
  sortList.value.splice(index - 1, 0, row);
};
const downSort = (row: Link) => {
  //匹配到当前列并将当前列向下移动一列
  const index = sortList.value.findIndex((item) => item.id === row.id);
  sortList.value.splice(index, 1);
  sortList.value.splice(index + 1, 0, row);
};
getAllResourceList();
getLinkList();
</script>

<style scoped lang="scss"></style>
