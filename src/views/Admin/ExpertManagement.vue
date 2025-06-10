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
            <n-button type="primary">
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
          </n-space>
        </n-form-item>
      </n-form>
    </n-card>
    <!-- 表格区域 -->
    <n-card class="table-part">
      <!-- <CTable> </CTable> -->
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
  <n-drawer
    v-model:show="drawerVisible"
    width="90%"
    placement="right"
    :on-esc="closed"
    :on-mask-click="() => closed()"
  >
    <n-drawer-content>
      <template #header>
        {{ editTarget?.id ? '编辑' : '新增' }}
      </template>
      <template #footer>
        <n-space>
          <n-button>取消</n-button>
          <n-button type="primary">保存</n-button>
        </n-space>
      </template>
      <!-- 表单，覆盖所有信息 -->
      <n-form ref="formRef" :model="editTarget" label-placement="top">
        <n-grid :cols="16" :x-gap="24">
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
</template>

<script setup lang="ts">
import type { Expert } from '@/types';
import type { UploadCustomRequestOptions } from 'naive-ui';
// const message = useMessage();
// const dialog = useDialog();
const drawerVisible = ref<boolean>(false);
const searchTarget = ref<Expert>({});
const editTarget = ref<Expert>({});
const tableData = ref<Expert[]>([]);
const handleCustomRequest = async ({ file }: UploadCustomRequestOptions) => {
  console.log(file);
};
const onFinish = () => {
  console.log('finish');
};
const pages = ref({
  page: 1,
  size: 10,
  total: 0,
});
const pageChange = (page: number) => {
  pages.value.page = page;
  searchData();
};
const searchData = () => {
  tableData.value = [];
};
const closed = () => {
  drawerVisible.value = false;
  editTarget.value = {};
};
const addExpert = () => {
  drawerVisible.value = true;
};
searchData();
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
