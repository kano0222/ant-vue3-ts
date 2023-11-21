<template>
  <el-card v-loading="loading">
    <div class="subtitle mb_20">辅工信息</div>
    <div>共计
      <span class="cyan" style="font-weight: bold; font-size: 1.5em;">{{ workerDetails.length }}</span>
      位辅工
    </div>
    <div class="auxiliaryWorkerList">
      <div class="auxiliaryWorkerRow flex mt_20" v-for="(item, index) in workerDetails">
        <div class="flex_center">姓名：<el-input readonly class="flex_1" v-model="item.realname" /></div>
        <div class="flex_center">证件号码：<el-input readonly class="flex_1" v-model="item.idcard" /></div>
        <div class="flex_center">联系方式：<el-input readonly class="flex_1" v-model="item.mobile" /></div>
        <el-icon v-if="!isReadonly" class="ml_20" style="cursor: pointer" color="#d81e06" :size="20"
          @click="removeItem(index)">
          <Delete />
        </el-icon>
      </div>
    </div>
    <template v-if="!isReadonly">
      <div class="flex select_none mt_20 options">
        <div class=" flex_center flex_1 mr_20" @click="addItem" style="background-color: #FEF7EC;">
          <el-icon class="mr_10">
            <Plus />
          </el-icon>申请添加辅工
        </div>
        <el-upload action="#" :http-request="uploadAction" :show-file-list="false" class="flex_1">
          <el-icon class="mr_10">
            <Camera />
          </el-icon>添加辅工
        </el-upload>
      </div>
      <div class="auxiliaryWorkerRow flex mt_20">
        <div class="required flex_center">姓名：<el-input class="flex_1" v-model="addItemRow.realname" /></div>
        <div class="required flex_center">证件号码：<el-input class="flex_1" v-model="addItemRow.idcard" /></div>
        <div class="required flex_center">联系方式：<el-input class="flex_1" v-model="addItemRow.mobile" /></div>
      </div>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { updateWorker, ocrIdCard } from '@/api/implementation/taskListDetail'
import { keyObjectIF } from '@/utils/commonUtils'
const loading = ref(false)

import { useTaskListDetailStore } from '../taskListDetailStore'
const taskListDetailStore = useTaskListDetailStore()
const taskListDetailData = computed(() => { return taskListDetailStore.taskListDetailData })
const workerDetails = computed(() => { return taskListDetailData.value.workerDetails || [] })
const busiStatus = computed(() => { return taskListDetailData.value.busiStatus || '0' })
const isReadonly = computed(() => { return ['10', '30', '60'].includes(busiStatus.value) })

const addItemRow: keyObjectIF = ref({ realname: '', idcard: '', mobile: '' })
const addItem = () => {
  let item = { ...addItemRow.value }
  for (let key of Object.keys(item)) {
    if (typeof (item[key]) == 'string') {
      item[key] = item[key].trim()
    }
    if ([null, undefined, ''].includes(item[key])) {
      ElMessage.error('请将信息填写完整')
      return
    }
  }
  if (workerDetails.value.map((item: any) => item.mobile).includes(item.mobile)) {
    ElMessage.error('该联系方式已使用')
    return
  }
  loading.value = true
  workerDetails.value.push(item)
  updateWorker({
    taskId: taskListDetailStore.taskId,
    workerList: workerDetails.value
  }).then(res => {
    if (!res.data) { workerDetails.value.splice(workerDetails.value.length - 1) }
  }).finally(() => {
    loading.value = false
    addItemRow.value = { realname: '', idcard: '', mobile: '' }
  })
}
const removeItem = (index: number) => {
  workerDetails.value.splice(index, 1)
  loading.value = true
  updateWorker({
    taskId: taskListDetailStore.taskId,
    workerList: workerDetails.value
  }).then(() => { }).finally(() => { loading.value = false })
}
import { uploadApi } from '@/api/commonApi'
import type { UploadRequestOptions } from 'element-plus'
const uploadAction = (options: UploadRequestOptions) => {
  let uploadFile = options.file
  let reader = new FileReader()
  reader.readAsDataURL(uploadFile)
  reader.onload = () => {
    const base64data = reader.result as string
    uploadApi({
      base64File: base64data.split(",")[1],
      originalFilename: uploadFile.name,
      type: uploadFile.type.indexOf("image") != -1 ? 1 : 0
    }).then(res => {
      if (res.data) {
        ElMessage.success('上传成功')
        options.onSuccess(res)
        let get = res.data[0]
        handleOCR(get.url)
      }
    })
  }
}
const handleOCR = (url: string) => {
  ocrIdCard(url).then(res => {
    if (res.data?.idCard) {
      let { idCard: idcard, realName: realname } = res.data
      Object.assign(addItemRow.value, { idcard, realname })
    } else {
      ElMessage.error('未识别到有效数据')
    }
  })
}

</script>

<style lang="scss" scoped>
.auxiliaryWorkerRow {
  align-items: center;
  white-space: nowrap;
  gap: 10px;

}

:deep(.el-upload) {
  width: 100%;
}

.options {
  padding-right: 40px;

  >div {
    cursor: pointer;
    border: #ccc 1px solid;
    border-radius: 5px;
    overflow: hidden;
  }

  >div:last-of-type {
    background-color: #F0FCF9;
  }

  line-height: 30px;
}
</style>