<template>
  <el-card>
    <div class="subtitle mb_20">拒绝理由</div>
    <div style="line-height: 1.6;font-size: 0.8em;">{{ refuseReason }}</div>
  </el-card>
</template>

<script setup lang="ts">

import { useTaskListDetailStore } from '../taskListDetailStore'
const taskListDetailStore = useTaskListDetailStore()
const refuseReason = computed(() => { return taskListDetailStore.taskListDetailData.refuseReason })


</script>
