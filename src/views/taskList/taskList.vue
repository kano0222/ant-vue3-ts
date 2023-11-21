<template>
  <div class="app-container">
    <a-card v-show="!taskListDetailStore.showDetail">
      <a-form ref="formRef" layout="inline" :model="formData">
        <a-form-item label="任务单编号" name="taskCode">
          <a-input v-model:value="formData.taskCode" />
        </a-form-item>
        <a-form-item label="任务单名称" name="taskName">
          <a-input v-model:value="formData.taskName" />
        </a-form-item>
        <a-form-item label="服务项名称" name="serviceName">
          <a-input v-model:value="formData.serviceName" />
        </a-form-item>
        <a-form-item label="服务项编号" name="serviceCcicId">
          <a-input v-model:value="formData.serviceCcicId" />
        </a-form-item>
        <a-form-item label="工作场所" name="workPlaceId">
          <a-tree-select style="width: 260px" v-model:value="formData.workPlaceId" :tree-data="placeTreeData"
            :fieldNames="{ label: 'placeName', value: 'placeId' }" show-search tree-node-filter-prop="placeName">
          </a-tree-select>
        </a-form-item>
        <a-form-item label="计划开工时间" name="time">
          <a-range-picker v-model:value="formData.time" valueFormat="YYYY-MM-DD" />
        </a-form-item>
        <a-form-item>
          <div class="searchOptions">
            <a-button type="primary" @click="handleSearch">查询</a-button>
            <a-button @click="resetForm">重置</a-button>
          </div>
        </a-form-item>
      </a-form>
      <a-tabs class="mt_20" :activeKey='formData.busiStatus' @change="handleChange" type="card">
        <a-tab-pane v-for="item in statusList" :tab="getTabLabel(item)" :key="item.value"></a-tab-pane>
      </a-tabs>
      <bs-ant-table :dataSource="dataSource" :columns="columns" childrenColumnName="taskList" :rowKey="rowKey"
        :loading="loading" :pagination="paginationData" @handleTableChange="getDataSource">
        <template #bodyCell="{ bodyCell }">
          <template v-if="bodyCell.column.dataIndex === 'busiStatus'">
            <a-tag v-if="getTagByBusiStatus(bodyCell.text)" :color="getTagTypeByBusiStatus(bodyCell.text)">{{
              getTagByBusiStatus(bodyCell.text)
            }}</a-tag>
          </template>
          <template v-else-if="bodyCell.column.dataIndex === 'options'">
            <div class="bsTableOptions">
              <a v-if="bodyCell.record.taskCode" @click="openDetail(bodyCell.record)">详情</a>
              <template v-if="showHandle(bodyCell.record)">
                <a class="warning" @click="acceptOrder(bodyCell.record, getDataSource)">接单</a>
                <a class="danger" @click="refuseOrder(bodyCell.record)">拒单</a>
              </template>
            </div>
          </template>
        </template>
      </bs-ant-table>
    </a-card>
    <!-- <task-list-detail-wrap v-show="taskListDetailStore.showDetail"></task-list-detail-wrap> -->
    <refuse-order-dialog @onComplete="getDataSource" ref="refuseOrderDialogDom"></refuse-order-dialog>
  </div>
</template>

<script setup lang="ts" name="taskList">
const loading = ref<boolean>(false)

import { getStat, statusList, columns, getTabLabel, acceptOrder, getTagTypeByBusiStatus, getTagByBusiStatus } from './taskList'

import { placeTreeApi } from '@/api/commonApi'
const placeTreeData = ref([])
placeTreeApi().then((res: any) => { if (Array.isArray(res.data)) { placeTreeData.value = res.data } })

import { usePagination } from '@/hooks/usePagination'
const { paginationData } = usePagination()
const rowKey = (row: any) => { return row.taskId ? row.taskId : row.mergeCode }
import { pageApi } from '@/api/implementation/taskList'

const getDataSource = () => {
  loading.value = true
  getStat()
  pageApi({
    current: paginationData.current,
    size: paginationData.pageSize,
    ...searchData,
    busiStatus: formData.busiStatus
  }).then(res => {
    let { total, records } = res.data
    paginationData.total = Number(total)
    dataSource.value = records.map((item: any) => { return item.task ? item.task : item })
    loading.value = false
  })
}
import { useSearchForm } from '@/hooks/useSearchForm'
const { formData, searchData, formRef, resetForm, handleSearch } = useSearchForm(paginationData,
  () => {
    if (searchData.pannedStartTime) {
      delete searchData.pannedStartTime
      delete searchData.plannedFinishTime
    }
    if (searchData.time) {
      searchData.pannedStartTime = searchData.time[0]
      searchData.plannedFinishTime = searchData.time[1]
      delete searchData.time
    }
    getDataSource()
  })
getDataSource()
const dataSource = ref([])

const handleChange = ((activeKey: string) => {
  formData.busiStatus = activeKey
  paginationData.current = 1
  getDataSource()
})

import taskListDetailWrap from './taskListDetailWrap.vue'
import { useTaskListDetailStore } from './taskListDetail/taskListDetailStore'
const taskListDetailStore = useTaskListDetailStore()
onUnmounted(() => { taskListDetailStore.showDetail = false })
watch(() => taskListDetailStore.showDetail, (newValue: boolean) => {
  if (!newValue) { getDataSource() }
})
const openDetail = (record: any) => {
  taskListDetailStore.taskId = record.taskId
  taskListDetailStore.entrustOrderId = record.entrustOrderId
  taskListDetailStore.getDetail()
}
const showHandle = (row: any) => {
  if (row.mergeCode && !row.taskCode) {
    return row.taskList[0].busiStatus == '10'
  } if (row.taskCode && !row.mergeCode) {
    return row.busiStatus == '10'
  }
}
import refuseOrderDialog from './refuseOrderDialog.vue'
const refuseOrderDialogDom = ref()
const refuseOrder = (record: any) => {
  refuseOrderDialogDom.value?.showModal({ ...record })
}
</script>
