<template>
  <a-card class="mt_10" size="small">
    <bs-table :dataSource="dataSource" :columns="columns" :loading="loading" :pagination="paginationData"
      @handleTableChange='getDataSource'>
    </bs-table>
  </a-card>
</template>
<script setup lang="ts" name="taskList">
import { getOperateLog } from '@/api/implementation/taskList'
import { useTaskListDetailStore } from './taskListDetailStore'
const loading = ref<boolean>(false)
const columns = reactive([
  {
    title: '序号',
    customRender: ({ index }: { index: number }) => {
      return (paginationData.current - 1) * paginationData.pageSize + index + 1
    }
  },
  { title: '操作类型', dataIndex: 'operateType' },
  { title: '操作人', dataIndex: 'creator' },
  { title: '操作时间', dataIndex: 'createTime' },
  { title: '内容', dataIndex: 'content' },
])

const dataSource = ref([])
import { usePagination } from '@/hooks/usePagination'
const { paginationData } = usePagination()

const getDataSource = () => {
  loading.value = true
  getOperateLog({
    current: paginationData.current,
    size: paginationData.pageSize,
    taskId: useTaskListDetailStore().taskId
  }).then(res => {
    let { total, records } = res.data
    paginationData.total = Number(total)
    dataSource.value = records
    loading.value = false
  })
}
getDataSource()

</script>