<template>
  <el-card>
    <div class="subtitle mb_20">车辆信息</div>
    <template v-if="taskListDetailData.carType == 1">
      <el-carousel v-if="carVo.urls && carVo.urls.length != 0" height="120px" indicator-position="none" :interval="10000">
        <el-carousel-item v-for="url in carVo.urls">
          <div class="flex_center"> <img :src="url" alt=""> </div>
        </el-carousel-item>
      </el-carousel>
      <div class="carNum flex_center mt_10">
        <span class="cyan mr_10">{{ carVo.carCode }}</span>{{ getCarType(taskListDetailData.carType) }}
      </div>
    </template>
    <template v-else>
      <div class="flex_center" v-if="taskListDetailData.carType == 2"> <img src="@/assets/img/private.png"></div>
      <div class="flex_center"> <span class="cyan">{{ getCarType(taskListDetailData.carType) }}</span> </div>
    </template>
    <div v-for="item in getCarList(taskListDetailData.carType)" class="flex mt_10" style="line-height: 1.4;">
      <div class="label text_right">{{ item.label }}： </div>
      <div class="value">{{ getValue(item, carVo) }}</div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { getCarList, getCarType, getValue } from './taskListData'

import { useTaskListDetailStore } from '../taskListDetailStore'
const taskListDetailStore = useTaskListDetailStore()
const taskListDetailData = computed(() => { return taskListDetailStore.taskListDetailData })

const carVo = computed(() => {
  return {
    ...taskListDetailData.value.carVo,
    distance: taskListDetailData.value.distance,
    trafficFree: taskListDetailData.value.trafficFree
  }
})

</script>

<style scoped>
.label {
  min-width: 40%;
}

img {
  height: 120px;
  max-width: 78%;
}

span {
  font-weight: bold;
  font-size: 20px;
  line-height: 34px;
}

.carNum span::first-letter {
  font-size: 1.5em;
}
</style>