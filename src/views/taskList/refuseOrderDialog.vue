<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { useModal } from '@/hooks/useModal'
const { modalVisible, modalData, showModal } = useModal()
defineExpose({ showModal })
const onCancel = () => {
  resetForm()
  modalVisible.value = false
}

const loading = ref<boolean>(false)
import { useForm } from '@/hooks/useForm'
const { formRef, formData, resetForm } = useForm({ refuseReason: '' })

import type { Rule } from 'ant-design-vue/es/form'
const rules: Record<string, Rule[]> = {
  refuseReason: [{ required: true, message: '请输入拒绝理由' }]
}

import { refuseApi } from '@/api/implementation/taskList'

const replyList: string[] = reactive([
  '手上项目过多，忙不过来了。',
  '工作地点太远。',
  '检查项目不在我的能力范围内。'
])
const addReply = (reply: string) => { formData.refuseReason += reply }
const emits = defineEmits(["onComplete"])
const handleSubmit = () => {
  formRef.value?.validate().then(() => {
    loading.value = true
    let { mergeCode, taskCode, taskId } = modalData
    let params = {}
    if (mergeCode) { params = { mergeCode } }
    else if (taskId) { params = { taskCode, taskId } }
    refuseApi({ ...params, refuseReason: formData.refuseReason }).then(res => {
      if (res.data) {
        message.success('拒单成功')
        emits('onComplete')
        onCancel()
      }
    }).finally(() => { loading.value = false })
  }).catch(() => { })
}
</script>

<template>
  <a-modal :open="modalVisible" :maskClosable="false" title="拒单" @cancel="onCancel" :width="500">
    <a-form ref="formRef" :model="formData" :rules="rules" :labelCol="{ style: { width: '120px' } }">
      <a-form-item label="拒绝理由" name="refuseReason">
        <a-textarea autoSize v-model:value="formData.refuseReason" />
      </a-form-item>
      <a-form-item label="快捷回复">
        <div class="replyList">
          <div v-for="item in replyList" @click="addReply(item)" style="cursor: pointer;width: fit-content;">
            {{ item }} </div>
        </div>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button @click="onCancel">取消</a-button>
      <a-button type="primary" @click="handleSubmit" :loading="loading">确认</a-button>
    </template>
  </a-modal>
</template>

<style lang="scss" scoped>
.replyList {
  line-height: 32px;
}
</style>
