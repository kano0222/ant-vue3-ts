<template>
  <el-card style="width: calc(50% - 5px);">
    <div class="subtitle mb_20">{{ getSequence(contactData.sequence) }}-{{ contactData.specificationName }}</div>
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px">
      <el-form-item v-if="contactData.remark">{{ contactData.remark }}</el-form-item>
      <el-form-item prop="file" v-if="['2', '3'].includes(contactData.action) && (!isReadonly || fileList.length != 0)"
        label="照片上传">
        <el-upload v-if="!isReadonly" action="#" :file-list="fileList" :http-request="uploadAction"
          list-type="picture-card" :on-preview="taskListDetailStore.handlePictureCardPreview" :on-remove="handleRemove">
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
        <div class="pictureCard" v-if="isReadonly && fileList.length != 0">
          <img v-for="item in fileList" :src="item.url" @click="taskListDetailStore.handlePictureCardPreview(item)">
        </div>
      </el-form-item>
      <el-form-item v-if="['2', '4'].includes(contactData.action) && (!isReadonly || contactData.description)"
        prop="description" label="说明描述">
        <el-input :readonly="isReadonly" v-model="formData.description" autosize type="textarea" placeholder="请输入"
          @input="savaSpecification" />
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { getSequence } from '../taskListData'
const props = defineProps({
  contactData: {
    type: Object,
    default: () => { return {} }
  }
})
import { useTaskListDetailStore } from '../../taskListDetailStore'
const taskListDetailStore = useTaskListDetailStore()
const taskListDetailData = computed(() => { return taskListDetailStore.taskListDetailData })
const busiStatus = computed(() => { return taskListDetailData.value.busiStatus || '0' })
const departureApply = computed(() => { return taskListDetailData.value.departureApply || {} })
import { getBusiStatusBySequence } from '../../taskListDetail'
const isReadonly = computed(() => {
  switch (busiStatus.value) {
    case '60': return true
    default: return busiStatus.value != getBusiStatusBySequence(props.contactData.sequence)
      && departureApply.value.status != '30'
  }
})

import type { FormInstance, FormRules } from 'element-plus'
const formData = reactive({ description: '' })
const formRef = ref<FormInstance>()
const formRules: FormRules = reactive({
  file: [{ required: props.contactData.required, trigger: 'change', message: '请上传照片' }],
})

import type { UploadUserFile, UploadRequestOptions, UploadProps } from 'element-plus'
const fileList = ref<UploadUserFile[]>([])
import { uploadApi } from '@/api/commonApi'
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
        options.onSuccess(res)
        let get = res.data[0]
        fileList.value = [...fileList.value, get]
        savaSpecification()
      }
    })
  }
}
const handleRemove: UploadProps['onRemove'] = () => {
  savaSpecification()
}

interface contactDataIF {
  contactId: string,
  taskId: string,
  attachment?: Array<string>,
  description?: string
}
const savaSpecification = () => {
  let { contactId, taskId } = props.contactData
  let get: contactDataIF = {
    taskId, contactId,
    attachment: fileList.value.map(item => item.url!),
    description: formData.description
  }
  if (props.contactData.action == '3') {
    delete get.description
  } else if (props.contactData.action == '4') {
    delete get.attachment
  }
  taskListDetailStore.savaSpecification(get)
}
watch(() => props.contactData, (newValue: any) => {
  let { attachment, description } = newValue
  if (Array.isArray(attachment) && attachment.length != 0) {
    fileList.value = attachment.map((url: string) => { return { url, name: url } })
  } else {
    fileList.value.length = 0
  }
  formData.description = description
}, { deep: true, immediate: true })

</script>

<style scoped></style>