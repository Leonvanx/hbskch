<template>
  <div class="article-list flex-column">
    <div class="title">
      <i-mdi-location></i-mdi-location>
      {{ '专家库列表' }}
    </div>
    <div class="list">
      <!-- 表格区域 -->
      <n-card class="table-part">
        <CTable
          :columns="columns"
          :scroll-x="2000"
          :table-data="expertList"
          :row-key="(row) => row.id"
        >
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
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Expert } from '@/types';
import { searchExpertList, searchExpertConfig } from '@/apis';
const columnsList = [
  {
    title: '编号',
    key: 'number',
  },
  {
    title: '姓名',
    key: 'name',
    fixed: 'left',
  },
  {
    title: '性别',
    key: 'gender',
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
    title: '身份证',
    key: 'idCard',
  },
  {
    title: '出生年月',
    key: 'birthDate',
  },
  {
    title: '关键词',
    key: 'keywords',
  },
  {
    title: '移动电话',
    key: 'mobilePhone',
  },
  {
    title: '邮箱',
    key: 'email',
  },
  {
    title: '毕业院校',
    key: 'graduateSchool',
  },
  {
    title: '所学专业',
    key: 'major',
  },
  {
    title: '学位',
    key: 'degree',
  },
  {
    title: '从事领域',
    key: 'fields',
  },
  {
    title: '领域细分',
    key: 'domainDetail',
  },
  {
    title: '单位地址',
    key: 'unitAddress',
  },
  {
    title: '单位性质',
    key: 'unitNature',
  },
  {
    title: '（原）所在单位',
    key: 'originalUnit',
  },
  {
    title: '工作部门',
    key: 'department',
  },
  {
    title: '职务',
    key: 'position',
  },
  {
    title: '职称',
    key: 'title',
  },
  {
    title: '办公电话',
    key: 'officePhone',
  },
  {
    title: '操作',
    key: 'actions',
    fixed: 'right',
  },
];
const columns = ref<Array<{ title: string; key: string; fixed?: undefined }>>([]);
const expertList = ref<Expert[]>();
const pages = ref({
  page: 1,
  size: 10,
  total: 0,
});
const pageChange = (page: number) => {
  pages.value.page = page;
  searchExpert();
};
const searchExpert = () => {
  searchExpertList({
    page: pages.value.page,
    size: pages.value.size,
  }).then((data) => {
    if (data.code === 0) {
      expertList.value = data.data?.records;
      pages.value.total = data.data ? data.data.total! : 0;
    }
  });
};
const searchExpertConfigBox = () => {
  searchExpertConfig().then((data) => {
    if (data.code === 0) {
      const fieldsList = data.data?.visibleFields.split(',') || [];
      columns.value = columnsList.filter((item) => fieldsList.includes(item.key));
      debugger;
    }
  });
};
searchExpert();
searchExpertConfigBox();
</script>

<style scoped lang="scss">
.article-list {
  width: 1200px;
  margin: 16px auto;
}

.title {
  font-size: 18px;
  color: #1a1a1a;
  font-weight: 600;
  // border-bottom: 1px solid #afadad;
  padding: 27px 5px;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
}

.list {
  min-height: 400px;

  .list-item {
    padding: 15px 8px;
    gap: 16px;
    border-bottom: 1px solid #dddddd;
    align-items: baseline;

    &::before {
      content: '';
      width: 8px;
      height: 8px;
      display: block;
      position: absolute;
      background-color: #1e80ff;
      top: 50%;
      transform: translateY(-50%);
    }

    .article-title {
      color: #1a1a1a;
      font-size: 16px;
      font-weight: 400;
      line-height: 20px;
      margin-left: 15px;

      &:hover {
        font-weight: 500;
        color: #ff3401;
      }
    }

    .release-time {
      font-size: 12px;
      color: #999;
      flex-shrink: 0;
    }
  }
}

.no-data {
  height: 500px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;

  span {
    position: relative;
    padding-top: 80px;
    font-size: 14px;
    color: #999;

    &::after {
      width: 60px;
      height: 60px;
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      background: url('@/assets/icons/empty.svg') no-repeat;
      background-size: 100%;
    }
  }
}

.article-pagination {
  margin: 16px auto;
}

@media screen and (max-width: 1200px) {
  .article-list {
    width: 100%;
    padding: 0 20px;
  }
}
</style>
<style scoped lang="scss">
.article-list {
  width: 1200px;
  margin: 16px auto;
}

.title {
  font-size: 18px;
  color: #1a1a1a;
  font-weight: 600;
  // border-bottom: 1px solid #afadad;
  padding: 27px 5px;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
}

.list {
  min-height: 400px;

  .list-item {
    padding: 15px 8px;
    gap: 16px;
    border-bottom: 1px solid #dddddd;
    align-items: baseline;

    &::before {
      content: '';
      width: 8px;
      height: 8px;
      display: block;
      position: absolute;
      background-color: #1e80ff;
      top: 50%;
      transform: translateY(-50%);
    }

    .article-title {
      color: #1a1a1a;
      font-size: 16px;
      font-weight: 400;
      line-height: 20px;
      margin-left: 15px;

      &:hover {
        font-weight: 500;
        color: #ff3401;
      }
    }

    .release-time {
      font-size: 12px;
      color: #999;
      flex-shrink: 0;
    }
  }
}

.no-data {
  height: 500px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;

  span {
    position: relative;
    padding-top: 80px;
    font-size: 14px;
    color: #999;

    &::after {
      width: 60px;
      height: 60px;
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      background: url('@/assets/icons/empty.svg') no-repeat;
      background-size: 100%;
    }
  }
}

.article-pagination {
  margin: 16px auto;
}

.table-part {
  flex: 1;
}

@media screen and (max-width: 1200px) {
  .article-list {
    width: 100%;
    padding: 0 20px;
  }
}
</style>
