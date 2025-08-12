<!--
  功能：专家库维护
  作者：disonlv
  邮箱：disonlv@outlook.com
  时间：2025年06月05日 10:32:16
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <n-flex vertical class="common-page">
    <!-- 搜索区域 -->
    <n-card class="search-part">
      <!-- 搜索区域，有上传按钮 -->
      <n-form
        ref="searchFormRef"
        class="search-form"
        label-placement="left"
        inline
        :label-width="80"
        :model="searchTarget"
      >
        <n-form-item label="专家姓名">
          <n-input v-model:value="searchTarget.name" placeholder="请输入专家姓名" />
        </n-form-item>
        <!-- 按钮，新增，上传专家excel文件 -->
        <n-form-item>
          <n-space>
            <n-button type="primary" @click="searchExpert">
              <template #icon>
                <n-icon>
                  <i-mdi-search style="font-size: 1.1rem; color: #fff" />
                </n-icon>
              </template>
              搜索</n-button
            >
            <n-button type="primary"> 重置</n-button>
            <n-button type="primary" @click="addExpert">
              <template #icon>
                <n-icon>
                  <i-mdi-add style="font-size: 1.1rem; color: #fff" />
                </n-icon>
              </template>
              新增</n-button
            >
            <n-upload
              :custom-request="handleCustomRequest"
              accept=".xlsx"
              :show-file-list="false"
              :on-finish="onFinish"
            >
              <n-button type="primary">上传</n-button>
            </n-upload>
            <n-button type="primary" @click="editExpertConfig">
              <template #icon>
                <n-icon>
                  <i-mdi-add style="font-size: 1.1rem; color: #fff" />
                </n-icon>
              </template>
              编辑配置</n-button
            >
          </n-space>
        </n-form-item>
      </n-form>
    </n-card>
    <!-- 表格区域 -->
    <n-card class="table-part">
      <CTable
        :columns="columns"
        :scroll-x="5000"
        :table-data="expertList"
        :row-key="(row) => row.id"
      >
        <template #actions="{ row }">
          <n-space>
            <n-button strong tertiary size="small" title="编辑" @click="editExpert(row)">
              <template #icon>
                <n-icon>
                  <i-iconoir-edit style="font-size: 1.1rem; color: #000" />
                </n-icon>
              </template>
            </n-button>
            <n-button strong tertiary size="small" title="删除" @click="delExpert(row)">
              <template #icon>
                <n-icon>
                  <i-material-symbols-light-delete style="font-size: 1.1rem; color: #000" />
                </n-icon>
              </template>
            </n-button>
          </n-space>
        </template>
      </CTable>
    </n-card>
    <!-- 分页区域 -->
    <n-card class="pagination-part">
      <n-pagination
        v-model:page="pages.page"
        :item-count="pages.total"
        :page-size="pages.size"
        :page-slot="7"
        @update:page="pageChange"
      />
    </n-card>
  </n-flex>
  <n-drawer v-model:show="drawerVisible" width="90%" placement="right">
    <n-drawer-content>
      <template #header>
        {{ editTarget?.id ? '编辑' : '新增' }}
      </template>
      <template #footer>
        <n-space>
          <n-button @click="cancel">取消</n-button>
          <n-button type="primary" @click="saveExpert">保存</n-button>
        </n-space>
      </template>
      <!-- 表单，覆盖所有信息 -->
      <n-form ref="formRef" :model="editTarget" label-placement="top">
        <n-grid :cols="16" :x-gap="24">
          <n-form-item-gi :span="8" label="序号" path="onnumber">
            <n-input v-model:value="onumberForForm" placeholder="请输入序号" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="姓名" path="name">
            <n-input v-model:value="editTarget.name" placeholder="请输入姓名" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="性别" path="gender">
            <n-input v-model:value="editTarget.gender" placeholder="请输入性别" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="出生年月" path="birthDate">
            <!-- 日期选择器 -->
            <n-date-picker
              v-model:formatted-value="editTarget.birthDate"
              value-format="yyyy.MM"
              placeholder="请选择出生年月"
              format="y年 M月"
              year-format="y年"
              month-format="M月"
              type="month"
              clearable
              style="width: '100%'"
            >
            </n-date-picker>
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="民族" path="ethnic">
            <n-input v-model:value="editTarget.ethnic" placeholder="请输入民族" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="面貌" path="politicalStatus">
            <n-input v-model:value="editTarget.politicalStatus" placeholder="请输入政治面貌" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="从事领域" path="fields">
            <n-input v-model:value="editTarget.fields" placeholder="请输入从事领域" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="领域细分" path="domainDetail">
            <n-input v-model:value="editTarget.domainDetail" placeholder="请输入领域细分" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="学位" path="degree">
            <n-input v-model:value="editTarget.degree" placeholder="请输入学位" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="毕业院校" path="graduateSchool">
            <n-input v-model:value="editTarget.graduateSchool" placeholder="请输入毕业院校" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="身份证" path="idCard">
            <n-input v-model:value="editTarget.idCard" placeholder="请输入身份证" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="职务" path="position">
            <n-input v-model:value="editTarget.position" placeholder="请输入职务" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="职称" path="title">
            <n-input v-model:value="editTarget.title" placeholder="请输入职称" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="（原）所在单位" path="originalUnit">
            <n-input v-model:value="editTarget.originalUnit" placeholder="请输入（原）所在单位" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="工作部门" path="department">
            <n-input v-model:value="editTarget.department" placeholder="请输入工作部门" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="单位地址" path="unitAddress">
            <n-input v-model:value="editTarget.unitAddress" placeholder="请输入单位地址" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="单位性质" path="unitNature">
            <n-input v-model:value="editTarget.unitNature" placeholder="请输入单位性质" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="办公电话" path="officePhone">
            <n-input v-model:value="editTarget.officePhone" placeholder="请输入办公电话" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="移动电话" path="mobilePhone">
            <n-input v-model:value="editTarget.mobilePhone" placeholder="请输入移动电话" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="邮箱" path="email">
            <n-input v-model:value="editTarget.email" placeholder="请输入邮箱" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="所学专业" path="major">
            <n-input v-model:value="editTarget.major" placeholder="请输入所学专业" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="关键词" path="keywords">
            <n-input v-model:value="editTarget.keywords" placeholder="请输入关键词" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="编号" path="number">
            <n-input v-model:value="editTarget.number" placeholder="请输入编号" />
          </n-form-item-gi>
          <n-form-item-gi :span="16" label="学术成就" path="academicAchievements">
            <n-input
              v-model:value="editTarget.academicAchievements"
              type="textarea"
              placeholder="请输入学术成就"
            />
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </n-drawer-content>
  </n-drawer>
  <n-drawer
    v-model:show="drawerConfigVisible"
    width="40%"
    placement="right"
    :on-esc="closedConfig"
    :on-mask-click="() => closedConfig()"
  >
    <n-drawer-content>
      <template #header>
        {{ '编辑' }}
      </template>
      <template #footer>
        <n-space>
          <n-button>取消</n-button>
          <n-button type="primary" @click="saveExpertConfigBtn">保存</n-button>
        </n-space>
      </template>
      <n-checkbox-group v-model:value="editConfigstr">
        <n-space item-style="display: flex;">
          <template v-for="item in columns" :key="item.key">
            <n-checkbox :value="item.key" :label="item.title" />
          </template>
        </n-space>
      </n-checkbox-group>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import type { Expert, ExpertConfig } from '@/types';
import type { UploadCustomRequestOptions } from 'naive-ui';
import {
  searchExpertListAll,
  uploadExcel,
  editExpertList,
  saveExpertList,
  searchExpertConfig,
  deleteExpertList,
  saveExpertConfig,
} from '@/apis';
import dayjs from 'dayjs';
// const message = useMessage();
// const dialog = useDialog();
const drawerVisible = ref<boolean>(false);
const drawerConfigVisible = ref<boolean>(false);
const searchTarget = ref<Expert>({});
const editTarget = ref<Expert & { onumber?: string | number }>({});
const editConfig = ref<ExpertConfig>();
const editConfigstr = ref<string[]>([]);
const message = useMessage();

// 计算属性，用于表单绑定
const onumberForForm = computed({
  get: () => editTarget.value.onumber?.toString() || '',
  set: (value: string) => {
    editTarget.value.onumber = value;
  },
});
const handleCustomRequest = async ({ file }: UploadCustomRequestOptions) => {
  const data = await uploadExcel({ file: file.file! });
  if (data.code === 0) {
    message.success('上传成功！');
    pageChange(1);
  } else {
    message.success('上传失败！');
  }
};
const onFinish = () => {
  console.log('finish');
};
const columns = [
  //加上序号展示
  {
    key: 'onumber',
    title: '序号',
  },
  {
    title: '领域细分',
    key: 'domainDetail',
    width: 220,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '从事领域',
    key: 'fields',
    width: 260,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '姓名',
    key: 'name',
  },
  {
    title: '性别',
    key: 'gender',
  },
  {
    title: '出生年月',
    key: 'birthDate',
  },
  {
    title: '民族',
    key: 'ethnic',
  },
  {
    title: '面貌',
    key: 'politicalStatus',
  },
  {
    title: '学位',
    key: 'degree',
  },
  {
    title: '毕业院校',
    key: 'graduateSchool',
    width: 120,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '身份证',
    key: 'idCard',
    width: 180,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '职务',
    key: 'position',
    width: 220,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '职称',
    key: 'title',
    width: 220,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '职称级别',
    key: 'titleLevel',
  },
  {
    title: '（原）所在单位',
    key: 'originalUnit',
    width: 280,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '工作部门',
    key: 'department',
  },
  {
    title: '单位地址',
    key: 'unitAddress',
    width: 280,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '单位性质',
    key: 'unitNature',
  },

  {
    title: '办公电话',
    key: 'officePhone',
  },
  {
    title: '移动电话',
    key: 'mobilePhone',
    width: 120,
  },
  {
    title: '邮箱',
    key: 'email',
    width: 180,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '所学专业',
    key: 'major',
  },
  {
    title: '关键词',
    key: 'keywords',
    width: 200,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '编号',
    key: 'number',
    ellipsis: {
      tooltip: true,
    },
  },
  {
    key: 'academicAchievements',
    title: '学术成就',
    width: 400,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '操作',
    key: 'actions',
    fixed: 'right' as const,
  },
].map((column) => ({
  ...column,
  minWidth: 100,
}));
const expertList = ref<Expert[]>([]);
const pages = ref({
  page: 1,
  size: 10,
  total: 0,
});
const pageChange = (page: number) => {
  pages.value.page = page;
  searchExpert();
};
//专家库列表查询
const searchExpert = () => {
  searchExpertListAll({
    name: searchTarget.value.name,
    page: pages.value.page,
    size: pages.value.size,
  }).then((data) => {
    if (data.code === 0 && data.data) {
      expertList.value = data.data?.records;
      pages.value.total = data.data ? data.data.total! : 0;
      expertList.value.forEach((item, index) => {
        //根据分页，页数*每页展示数量计算出实际顺序
        item.index = (pages.value.page - 1) * pages.value.size + index + 1;
      });
    }
  });
};
//配置查询
const searchExpertConfigBox = () => {
  searchExpertConfig().then((data) => {
    if (data.code === 0) {
      editConfigstr.value = data.data?.visibleFields.split(',') || [];
      editConfig.value = data.data;
    }
  });
};
const addExpert = () => {
  drawerVisible.value = true;
};
const editExpertConfig = () => {
  searchExpertConfigBox();
  drawerConfigVisible.value = true;
};
const editExpert = (row: Expert & { onumber?: string }) => {
  editTarget.value = row;
  editTarget.value.birthDate = dayjs(row.birthDate?.split('.').join('-')).format('YYYY.MM');
  editTarget.value.onumber = row.onumber ? row.onumber.toString() : '';
  drawerVisible.value = true;
};
//删除专家
const delExpert = (row: Expert) => {
  deleteExpertList(row.id ? row.id : 0).then((data) => {
    if (data.code === 0) {
      message.success('删除成功！');
      pageChange(1);
    }
  });
};
const closedConfig = () => {
  drawerConfigVisible.value = false;
};
const cancel = () => {
  drawerVisible.value = false;
  editTarget.value = {};
};
//编辑配置
const saveExpertConfigBtn = () => {
  if (editConfigstr.value!.length > 0) {
    let configStr = '';
    for (let i = 0; i < editConfigstr.value!.length; i++) {
      if (i != editConfigstr.value!.length - 1) {
        configStr += `${editConfigstr!.value[i]},`;
      } else {
        configStr += `${editConfigstr!.value[i]}`;
      }
    }
    const params = {
      id: editConfig.value!.id,
      configName: editConfig.value?.configName,
      visibleFields: configStr,
    };
    saveExpertConfig(params).then((data) => {
      if (data.code === 0) {
        message.success('修改成功！');
        closedConfig();
      }
    });
  }
};
//编辑/新增专家
const saveExpert = () => {
  if (editTarget.value?.id) {
    if (editTarget.value.onumber && typeof editTarget.value.onumber === 'string') {
      editTarget.value.onumber = Number(editTarget.value.onumber);
    }
    editExpertList(editTarget.value).then((data) => {
      if (data.code === 0) {
        message.success('修改成功！');
        if (editTarget.value.id) {
          pageChange(pages.value.page);
        } else {
          pageChange(1);
        }
        cancel();
      }
    });
  } else {
    const params = {
      academicAchievements: editTarget.value.academicAchievements || '',
      birthDate: editTarget.value.birthDate || '',
      createTime: editTarget.value.createTime || '',
      degree: editTarget.value.degree || '',
      department: editTarget.value.department || '',
      domainDetail: editTarget.value.domainDetail || '',
      email: editTarget.value.email || '',
      ethnic: editTarget.value.ethnic || '',
      fields: editTarget.value.fields || '',
      gender: editTarget.value.gender || '',
      graduateSchool: editTarget.value.graduateSchool || '',
      id: 0,
      idCard: editTarget.value.idCard || '',
      keywords: editTarget.value.keywords || '',
      major: editTarget.value.major || '',
      mobilePhone: editTarget.value.mobilePhone || '',
      name: editTarget.value.name || '',
      number: editTarget.value.number || '',
      officePhone: editTarget.value.officePhone || '',
      originalUnit: editTarget.value.originalUnit || '',
      politicalStatus: editTarget.value.politicalStatus || '',
      position: editTarget.value.position || '',
      title: editTarget.value.title || '',
      unitAddress: editTarget.value.unitAddress || '',
      unitNature: editTarget.value.unitNature || '',
      updateTime: editTarget.value.updateTime || '',
    };
    saveExpertList(params).then((data) => {
      if (data.code === 0) {
        message.success('保存成功！');
        if (editTarget.value.id) {
          pageChange(pages.value.page);
        } else {
          pageChange(1);
        }
        cancel();
      }
    });
  }
};
searchExpert();
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
<style>
.v-binder-follower-content {
  max-width: 600px;
}
</style>
