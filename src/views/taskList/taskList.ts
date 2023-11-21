import { statApi, acceptApi } from '@/api/implementation/taskList'
import { keyObjectIF } from '@/types/common'
import { message, Modal } from 'ant-design-vue'
export interface statusItem {
  value: string,
  label: string,
  prop?: string,
  type?: string
}
export const statusList = reactive<statusItem[]>([
  { value: '', label: '全部' },
  { value: '10', label: '待接单', prop: 'pendingNum', type: 'warning' },
  { value: '20', label: '待开工', prop: 'notStartNum', type: 'processing' },
  { value: '40', label: '实施中', prop: 'inOperateNum', type: 'success' },
  { value: '50', label: '完工待审核', prop: 'completeReviewNum', type: 'warning' },
  { value: '60', label: '已完结', prop: 'completedNum', type: 'success' },
  { value: '30', label: '已拒绝', prop: 'refusedNum', type: 'error' },
])
export const columns = reactive([
  {
    title: '任务单编号',
    dataIndex: 'taskCode',
    customRender: ({ record }: { record: any }) => {
      return record.taskCode ? record.taskCode : record.mergeCode
    },
    ellipsis: true
  },
  {
    title: '任务单名称',
    dataIndex: 'taskName',
    customRender: ({ record }: { record: any }) => {
      return record.taskName ? record.taskName : record.mergeName
    }
  },
  {
    title: '服务项编号',
    dataIndex: 'serviceCcicId',
    ellipsis: true
  },
  {
    title: '服务项名称',
    dataIndex: 'serviceName'
  },
  {
    title: '计划开工时间',
    dataIndex: 'pannedStartTime',
    customRender: ({ record }: { record: any }) => {
      return record.pannedStartTime ? record.pannedStartTime.slice(0, 11) + record.week : ''
    }
  },
  {
    title: '工作场所',
    dataIndex: 'workPlaceName',
    ellipsis: true
  },
  {
    title: '状态',
    dataIndex: 'busiStatus'
  },
  {
    title: '操作',
    dataIndex: 'options'
  }
])
export const getTagByBusiStatus = (busiStatus: string) => {
  return statusList.find(item => item.value == busiStatus)?.label
}
export const getTagTypeByBusiStatus = (busiStatus: string) => {
  return statusList.find(item => item.value == busiStatus)?.type
}
const statList: keyObjectIF = reactive({
  completeReviewNum: 0, //完工待审核任务单数量
  completedNum: 0, //已完工任务单数量
  inOperateNum: 0, //实施中任务单数量
  notStartNum: 0, //未开工任务单数量
  pendingNum: 0, //待接单任务单数量
  refusedNum: 0 //已拒绝任务单数量
})
export const getStat = () => { statApi().then(res => { Object.assign(statList, res.data) }) }
export const getTabLabel = (item: statusItem) => {
  return item.prop ? `${item.label}（${statList[item.prop]})` : item.label
}
export const acceptOrder = (record: any, onComplete = () => { }) => {
  let { mergeCode, mergeName, taskCode, taskName, taskId } = record
  Modal.confirm({
    title: '提示',
    content: mergeName ? `该任务单属于任务包${mergeName},是否接收该任务包` : `是否接收任务单${taskName}`,
    onOk() {
      let params = {}
      if (mergeCode) { params = { mergeCode } }
      else if (taskId) { params = { taskCode, taskId } }
      acceptApi(params).then(res => {
        if (res.data) {
          onComplete()
          message.success('接单成功')
        }
      })
    },
    onCancel() { },
  })
}