<!--
  功能：table组件封装
  作者：xulf
  邮箱：lvin_xu@outlook.com
  时间：2025年04月09日 23:56:49
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <n-data-table
    :columns="processedColumns"
    :data="props.tableData"
    :row-key="props.rowKey"
    :bordered="props.bordered"
    :striped="props.striped"
    :size="props.size"
    :loading="props.loading"
    :show-header="props.showHeader"
    :row-selection="props.rowSelection"
  >
    <!-- 遍历所有插槽，将插槽内容插入到对应的列中 -->
    <template v-for="(slotName, index) in Object.keys($slots)" :key="index" #[slotName]="{ row }">
      <slot :name="slotName" :row="row"></slot>
    </template>
  </n-data-table>
</template>

<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui';
import type { RowData } from 'naive-ui/es/data-table/src/interface';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TableDataItem = Record<string, any>;
type Props = {
  columns: DataTableColumns<TableDataItem>;
  tableData: TableDataItem[];
  // eslint-disable-next-line no-unused-vars
  rowKey?: (row: RowData) => string | number;
  bordered?: boolean;
  striped?: boolean;
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  showHeader?: boolean;
  rowSelection?: {
    type: 'checkbox' | 'radio';
    selectedRowKeys?: (string | number)[];
  };
};
const props = defineProps<Props>();

const $slots = useSlots();

const processedColumns = computed(() => {
  return props.columns.map((column) => {
    //@ts-expect-error no-explicit-key
    if (column.key && typeof column.key === 'string' && $slots[column.key]) {
      return {
        ...column,
        render: (row: TableDataItem) => {
          //@ts-expect-error no-explicit-key
          return $slots[column.key]?.({ row });
        },
      };
    }
    return column;
  });
});
</script>

<style scoped lang="scss"></style>
