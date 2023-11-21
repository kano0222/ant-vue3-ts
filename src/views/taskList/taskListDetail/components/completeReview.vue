<template>
  <el-card style="position:relative">
    <img class="status" :src="getStatus()" />
    <div class="subtitle mb_20">完工审核意见</div>
    <div class="flex">
      <el-avatar :size="80" :src="departureApply.headurl || user"> </el-avatar>
      <div class="ml_10">
        <div class="mt_10 fs_12 flex_center">
          <span class="cyan mr_10">{{ departureApply.realname }}</span>
          {{ departureApply.departmentName }}
        </div>
        <div class="mt_20">{{ departureApply.mobile }}</div>
      </div>
    </div>
    <div class="flex mt_20" v-if="departureApply.checkSuggest">
      <div class="label text_right mr_10 white_nowrap">审核意见：</div>
      <div>{{ departureApply.checkSuggest }}</div>
    </div>
    <div class="flex mt_20" v-if="departureApply.checkAttachment && departureApply.checkAttachment.length">
      <div class="label text_right mr_10 white_nowrap">凭证上传：</div>
      <div class="pictureCard"><img v-for="url in departureApply.checkAttachment" :src="url" alt=""
          @click="taskListDetailStore.handlePictureCardPreview(url)"> </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import agree from '@/assets/img/agree.png'
import failed from '@/assets/img/failed.png'
import pending from '@/assets/img/pending.png'
import user from '@/assets/img/user.png'

import { useTaskListDetailStore } from '../taskListDetailStore'
const taskListDetailStore = useTaskListDetailStore()
const taskListDetailData = computed(() => { return taskListDetailStore.taskListDetailData })
const departureApply = computed(() => { return taskListDetailData.value.departureApply || {} })

const getStatus = () => {
  switch (departureApply.value.status) {
    case '10': return pending
    case '20': return agree
    case '30': return failed
    default: return pending
  }
}

</script>

<style scoped>
.status {
  position: absolute;
  width: 70px;
  right: 10px;
  top: 10px;
}

span {
  font-size: 22px;
  font-weight: bold;
}

.label {
  width: 25%;
}
</style>