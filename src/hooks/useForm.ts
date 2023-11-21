import type { FormInstance } from 'ant-design-vue'
import { keyObjectIF } from '@/types/common'
export const useForm = (initialFormData: keyObjectIF = {}) => {
  const formRef = ref<FormInstance>()
  const formData: keyObjectIF = reactive({ ...initialFormData })
  const resetForm = () => { formRef.value?.resetFields() }
  return {
    formRef, formData, resetForm
  }
}