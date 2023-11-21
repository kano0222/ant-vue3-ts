<template>
  <div class="flex mt_10">
    <div class="left mr_10">
      <task-list-information></task-list-information>
      <car-information></car-information>
      <work-information v-if="busiStatus != '10'"></work-information>
      <timeline-information></timeline-information>
    </div>
    <div class="right flex_1">
      <auxiliary-worker-information />
      <div class="both flex mt_10">
        <refuse-information v-if="busiStatus == '30'"></refuse-information>
        <contactsInformation sequence="1" v-if="['20', '60'].includes(busiStatus)"></contactsInformation>
        <!-- <check-in v-if="busiStatus == '20'"></check-in> -->
        <contactsInformation sequence="2" v-if="['40', '50', '60'].includes(busiStatus)"></contactsInformation>
        <complete-form v-if="['40', '50', '60'].includes(busiStatus)"></complete-form>
        <complete-review v-if="['50', '60'].includes(busiStatus)"></complete-review>
        <template v-if="departureApply.status == '20'">
          <contactsInformation sequence="3" v-if="['50', '60'].includes(busiStatus)"></contactsInformation>
          <!-- <check-in v-if="busiStatus == '50'"></check-in> -->
        </template>
      </div>
    </div>
  </div>
  <div class="flex_center mt_20" v-if="busiStatus == '10'">
    <el-button type="primary" @click="acceptOrder(taskListDetailData, taskListDetailStore.getDetail)">接单</el-button>
    <el-button type="danger" @click="refuseOrder">拒绝</el-button>
  </div>
  <contacts-dialog ref="contactsDialogDom"></contacts-dialog>
  <refuse-order-dialog @onComplete="taskListDetailStore.getDetail" ref="refuseOrderDialogDom"></refuse-order-dialog>
</template>

<script setup lang="ts">
import { acceptOrder } from '../taskList'
import taskListInformation from './components/taskListInformation.vue'
import workInformation from './components/workInformation.vue'
import carInformation from './components/carInformation.vue'
import auxiliaryWorkerInformation from './components/auxiliaryWorkerInformation.vue'
import refuseInformation from './components/refuseInformation.vue'
import contactsInformation from './components/contacts/contactsInformation.vue'
import contactsDialog from './components/contacts/contactsDialog.vue'
const contactsDialogDom = ref()
import completeForm from './components/completeForm.vue'
import completeReview from './components/completeReview.vue'
import TimelineInformation from './components/timelineInformation.vue'
// import CheckIn from './components/checkIn.vue'


import { useTaskListDetailStore } from './taskListDetailStore'
const taskListDetailStore = useTaskListDetailStore()
const taskListDetailData = computed(() => { return taskListDetailStore.taskListDetailData })
const busiStatus = computed(() => { return taskListDetailData.value.busiStatus })
const departureApply = computed(() => { return taskListDetailData.value.departureApply || {} })

import refuseOrderDialog from '../refuseOrderDialog.vue'
const refuseOrderDialogDom = ref()
const refuseOrder = (record: any) => {
  refuseOrderDialogDom.value?.showDialog({ ...record })
}
import { getSequenceByBusiStatus } from './taskListDetail'
onMounted(() => {
  if (taskListDetailStore.contacts.length != 0) {
    let list = taskListDetailStore.contacts.filter((item: any) =>
      item.sequence == getSequenceByBusiStatus(busiStatus.value) && item.action == '1')
    if (list.length != 0) { contactsDialogDom.value?.showDialog(list) }
  }
})
onUnmounted(() => { taskListDetailStore.clearAll() })
</script>

<style lang="scss" scoped>
.left {
  width: 35%;
  min-width: 480px;

  >div+div {
    margin-top: 10px;
  }
}

.right {
  width: 0;

  .both {
    gap: 10px;
    flex-wrap: wrap;

    >div {
      width: calc(50% - 5px);
      // min-width: 400px;
    }
  }
}
</style>