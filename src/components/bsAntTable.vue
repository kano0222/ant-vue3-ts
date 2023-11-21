<template>
  <div>
    <a-table :rowKey="rowKey" :childrenColumnName="childrenColumnName" :dataSource="dataSource" :columns="columns"
      :loading="loading" :size="size" @change="handleChange" :pagination="pagination">
      <template #bodyCell="bodyCell">
        <slot name="bodyCell" :bodyCell="bodyCell"></slot>
      </template>
    </a-table>
  </div>
</template>
<script setup lang='ts'>

import type { TableColumnsType, } from 'ant-design-vue'
import { AlignType } from 'ant-design-vue/es/vc-table/interface'
import { ColumnFilterItem } from 'ant-design-vue/es/table/interface'
const props = defineProps({
  dataSource: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array as () => TableColumnsType,
    required: true,
  },
  pagination: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
  align: {
    type: String as () => AlignType,
    default: 'center'
  },
  size: {
    type: String,
    default: 'small'
  },
  rowKey: {
    type: [String, Function],
    default: 'key'
  },
  childrenColumnName: {
    type: String,
    default: 'children'
  }
})
props.columns.map((item) => { item.align = props.align })
const emits = defineEmits(["handleTableChange"])
const handleChange = (pagination: object | false, _filters: ColumnFilterItem[]) => {
  Object.assign(props.pagination, pagination)
  emits("handleTableChange")
}
</script>