import { defineStore } from 'pinia'
import { keyObjectIF } from '@/types/common'
import { detailApi, entrustOrderIdDetailApi } from '@/api/implementation/taskList'
// import { savaSpecificationAPi } from '@/api/implementation/taskListDetail'
import { message } from 'ant-design-vue'

export const useTaskListDetailStore = defineStore('taskList', () => {
  const showDetail = ref(false)
  const loading = ref(false)//详情页加载中
  const changeShowDetail = () => { showDetail.value = !showDetail.value }
  const taskId = ref('')
  const entrustOrderId = ref('')
  const entrustOrderDetailData = ref<keyObjectIF>({})
  const taskListDetailData = ref<keyObjectIF>({})
  const contacts = computed(() => { return taskListDetailData.value.contacts || [] })
  const getDetail = () => {
    if (!showDetail.value) { changeShowDetail() }
    loading.value = true
    Promise.all([
      new Promise((resolve) => {
        entrustOrderIdDetailApi(entrustOrderId.value).then(res => {
          entrustOrderDetailData.value = res.data
          resolve(res.data)
        })
      }),
      new Promise((resolve) => {
        detailApi(taskId.value).then(res => {
          taskListDetailData.value = res.data
          resolve(res.data)
        })
      })
    ]).then(() => {
      loading.value = false
    })
  }
  const dialogControl = ref({
    dialogImageUrl: '',
    previewVisible: false
  })
  const handlePictureCardPreview = (item: any) => {
    dialogControl.value.dialogImageUrl = item.url ? item.url : item
    dialogControl.value.previewVisible = true
  }

  interface contactDataIF {
    contactId: string,
    taskId: string,
    attachment?: Array<string>,
    description?: string
  }
  let timer: NodeJS.Timeout
  const autoSaveList = ref<contactDataIF[]>([])
  const autoSave = computed(() => { return autoSaveList.value.length != 0 })
  const savaSpecification = (contactData: contactDataIF) => {
    autoSaveList.value.push(contactData)
    clearTimeout(timer)
    timer = setTimeout(() => {
      uploadSpecification()
    }, 5000)
  }
  const uploadSpecification = () => {
    message.info('自动保存中。。。')
    loading.value = true
    let list: contactDataIF[] = []
    for (let index = autoSaveList.value.length; index > 0; index--) {//倒序去重
      const element = autoSaveList.value[index - 1]
      if (!list.map(item => item.contactId).includes(element.contactId)) {
        list.push(element)
      }
    }
    // savaSpecificationAPi({ list })
    //   .then(res => {
    //     if (res.data) {
    //       message.success('更新成功')
    //       autoSaveList.value.length = 0
    //       getDetail()
    //     }
    //   }).finally(() => { loading.value = false })
  }
  const uploadSpecificationImmediately = () => {
    message.info('检测到还有未保存的数据')
    clearTimeout(timer)
    uploadSpecification()
  }
  const clearAll = () => {
    clearTimeout(timer)
    autoSaveList.value.length = 0
  }
  return {
    showDetail, changeShowDetail,//详情页显示
    taskId, entrustOrderId, loading,//详情页配置
    getDetail,//详情方法
    taskListDetailData, entrustOrderDetailData, contacts,//详情数据
    dialogControl, handlePictureCardPreview, //图片预览
    savaSpecification, uploadSpecificationImmediately, autoSave, //作业规范
    clearAll
  }
})