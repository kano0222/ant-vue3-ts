import { keyObjectIF } from '@/types/common'

export const useModal = (afterShow = () => { }) => {
  const modalVisible = ref<boolean>(false)
  const modalData: keyObjectIF = reactive({ modalTitle: '' })
  const showModal = (getData: any) => {
    Object.assign(modalData, getData)
    modalVisible.value = true
    afterShow()
  }
  return {
    modalVisible, modalData, showModal
  }
}