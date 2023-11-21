<template>
  <el-card>
    <div class="subtitle mb_20">打卡记录</div>
    <div class="flex_center">
      <el-timeline>
        <el-timeline-item v-for="activity in clockInformations" :color="getColor(activity.clockType)">
          <div class="flex_between mb_10">
            <div :style="{ color: getColor(activity.clockType) }">
              {{ activity.describe }}
            </div>
            <div style="color: #aaa;font-weight: bold;" class="fs_12 ml_10">{{ activity.createTime }}</div>
          </div>
          <template v-if="['4', '5'].includes(activity.clockType)">
            <div>打卡地址：{{ activity.position || '-' }}</div>
            <div class="mt_10">经度:{{ activity.lng || '-' }}，纬度:{{ activity.lat || '-' }}</div>
          </template>
        </el-timeline-item>
      </el-timeline>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { useTaskListDetailStore } from '../taskListDetailStore'
const taskListDetailStore = useTaskListDetailStore()
const taskListDetailData = computed(() => { return taskListDetailStore.taskListDetailData })
const clockInformations = computed(() => { return taskListDetailData.value.clockInformations || [] })

const getColor = (clockType: string) => {
  switch (clockType) {
    case '3': return '#E75E6F'
    case '4': return 'rgba(245, 154, 35, 1)'
    case '5': return 'rgba(95, 241, 154, 1)'
    default: return ''
  }
}

</script>
