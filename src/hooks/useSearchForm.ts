import type { FormInstance } from 'ant-design-vue'
import { keyObjectIF } from '@/types/common'
export const useSearchForm = (paginationData: { current: number }, getTableData: Function) => {
  const formRef = ref<FormInstance>()
  const formData: keyObjectIF = reactive({})
  const searchData: keyObjectIF = reactive({})

  const handleSearch = () => {
    paginationData.current = 1
    Object.assign(searchData, formData)
    Object.keys(searchData).map(key => {
      if (searchData[key] === '' || searchData[key] === undefined || searchData[key] === null) {
        delete searchData[key]
      }
    })
    getTableData()
  }

  const resetForm = () => {
    paginationData.current = 1
    formRef.value?.resetFields()
    handleSearch()
  }
  return {
    formRef, formData, searchData, resetForm, handleSearch
  }
}