<template>
  <el-card>
    <div class="subtitle mb_20">任务单信息</div>
    <div v-for="item in taskList" class="flex mb_10" style="line-height: 1.4;">
      <div class="label text_right">{{ item.label }}： </div>
      <div class="value">{{ taskListDetailData[item.prop] || '-' }}</div>
    </div>
    <div class="flex" v-if="taskListDetailData.attachment">
      <div class="label text_right">附件： </div>
      <div class="pictureCard"><img :src="taskListDetailData.attachment" alt="附件"
          @click="taskListDetailStore.handlePictureCardPreview(taskListDetailData.attachment)"></div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { taskList } from './taskListData'
import { useTaskListDetailStore } from '../taskListDetailStore'
const taskListDetailStore = useTaskListDetailStore()
const taskListDetailData = computed(() => { return taskListDetailStore.taskListDetailData })
</script>

<style scoped>
.label {
  min-width: 40%;
}
</style>