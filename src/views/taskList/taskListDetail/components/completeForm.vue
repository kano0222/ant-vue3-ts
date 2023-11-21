<template>
  <el-card>
    <div class="subtitle mb_20">完工申请</div>
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px">
      <el-form-item prop="reason" label="申请理由">
        <el-input :readonly="isReadonly" v-model="formData.reason" autosize type="textarea" placeholder="请输入" />
      </el-form-item>
      <el-form-item v-if="!isReadonly || fileList.length != 0" label="照片上传">
        <el-upload v-if="!isReadonly" action="#" :file-list="fileList" :http-request="uploadAction"
          list-type="picture-card" :on-preview="taskListDetailStore.handlePictureCardPreview">
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
        <div class="pictureCard" v-if="isReadonly && fileList.length != 0">
          <img v-for="item in fileList" :src="item.url" @click="taskListDetailStore.handlePictureCardPreview(item)">
        </div>
      </el-form-item>
      <el-form-item v-if="!isReadonly">
        <el-button :disabled="!isAble" type="primary" @click="handleSubmit" :loading="loading">{{ failed ? '重新提交申请' :
          '提交完工申请' }}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { finishApplyApi } from '@/api/implementation/taskListDetail'

import { useTaskListDetailStore } from '../taskListDetailStore'
const taskListDetailStore = useTaskListDetailStore()
const taskListDetailData = computed(() => { return taskListDetailStore.taskListDetailData })
const busiStatus = computed(() => { return taskListDetailData.value.busiStatus || '0' })
const departureApply = computed(() => { return taskListDetailData.value.departureApply || {} })
const isReadonly = computed(() => { return ['50', '60'].includes(busiStatus.value) && departureApply.value.status != '30' })
const failed = computed(() => { return departureApply.value.status == '30' })
const contacts = computed(() => {
  return taskListDetailStore.contacts.filter((item: any) =>
    item.sequence == '2' && item.action != '1' && item.required)
})
const isAble = computed(() => {
  if (failed.value) {
    return contacts.value.every((item: any) => item.attachment && item.attachment.length != 0)
  }
  return contacts.value.every((item: any) => item.attachment && item.attachment.length != 0)
})

const loading = ref<boolean>(false)
const formRef = ref<FormInstance>()
const formData = reactive({ reason: '' })
const formRules: FormRules = reactive({
  reason: [{ required: true, trigger: 'blur', message: '请输入申请理由' }],
})

import { useUpload } from '@/utils/uploadUtils'
const { fileList, uploadAction } = useUpload()

if (busiStatus.value != '40') {
  let { attachment, reason } = departureApply.value
  formData.reason = reason
  if (Array.isArray(attachment) && attachment.length != 0) {
    fileList.value = attachment.map((url: string, index: number) => { return { url, name: url, uid: -index } })
  }
}

const handleSubmit = () => {
  formRef.value?.validate((valid: boolean) => {
    if (!valid) { return }
    if (taskListDetailStore.autoSave) {
      taskListDetailStore.uploadSpecificationImmediately()
      return
    }
    loading.value = true
    let { taskId, taskCode } = taskListDetailData.value
    finishApplyApi(
      {
        ...formData,
        taskId, taskCode,
        attachment: fileList.value.map(item => item.url)
      }
    ).then(res => {
      if (res.data) {
        ElMessage.success('提交成功')
        taskListDetailStore.getDetail()
      }
    }).finally(() => { loading.value = false })
  })
}
</script>

<style scoped>
.label {
  min-width: 40%;
}
</style>