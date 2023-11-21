<template>
  <div>
    <el-table :tree-props="treeProps" :row-key="rowKey" :data="tableData" default-expand-all style="width: 100%"
      max-height="550">
      <el-table-column type="selection" width="55" v-if="selection" />
      <el-table-column v-for="(item, index) in column" :key="index" align="center" :label="item.label" :prop="item.prop"
        :min-width="item.minWidth" :formatter="item.formatter" show-overflow-tooltip>
        <template #default="scope" v-if="item.type == 'identifier'">
          <span>{{ (Number(paginationData.current) - 1) * Number(paginationData.size) + scope.$index + 1 }}</span>
        </template>
        <template #default="scope" v-else-if="item.type">
          <slot :name="item.type" :row="scope.row"></slot>
        </template>
      </el-table-column>
      <el-table-column v-if="hasOptions" fixed="right" label="操作" align="center" min-width="150">
        <template #default="scope">
          <div class="bsTableOptions">
            <slot name="options" :row="scope.row"></slot>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="paginationData.current" :page-size="paginationData.size" :page-sizes="[5, 10, 20]"
      layout="slot, prev, pager, next, sizes, jumper" :total="paginationData.total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
      <div style="color: #606266;flex: 1;">
        共 {{ paginationData.total }} 条记录
        第 {{ paginationData.current }} / {{ Math.ceil(paginationData.total / paginationData.size) }} 页
      </div>
    </el-pagination>
  </div>
</template>
<script setup lang='ts'>

const props = defineProps({
  tableData: {
    type: Array,
    default: () => { return [] },
  },
  treeProps: {
    type: Object,
    default: () => {
      return { hasChildren: 'hasChildren', children: 'children' }
    },
  },
  rowKey: {
    type: [String, Function]
  },
  column: {
    type: Array as PropType<any>,
    required: true,
  },
  hasOptions: {
    type: Boolean,
    default: true,
  },
  selection: {
    typeof: Boolean,
    default: false
  },
  paginationData: {
    type: Object,
    default: () => {
      return {
        current: 1,
        size: 10,
        total: 0
      }
    }
  }
})
const emits = defineEmits(["getTableData"])
const handleSizeChange = (size: number) => {
  props.paginationData.size = size
  props.paginationData.current = 1
  emits("getTableData")
}
const handleCurrentChange = (current: number) => {
  props.paginationData.current = current
  emits("getTableData")
}
</script>
<style lang="scss" scoped>
:deep(.el-table) {
  thead {
    height: 50px;
  }

  th {
    background-color: #fafafa !important;
  }

  .bsTableOptions {
    >a+a {
      ::before {
        content: '|';
        color: #ebeef3;
        margin: 0 5px;
      }
    }
  }
}

.el-pagination {
  padding-top: 40px;
}
</style>