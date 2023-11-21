export const statisticList = reactive([
  {
    label: '任务单编号',
    prop: 'taskCode'
  },
  {
    label: '任务单名称',
    prop: 'taskName'
  },
  {
    label: '工作场所',
    prop: 'workPlaceName'
  },
  {
    label: '服务项编号',
    prop: 'serviceCcicId'
  },
  {
    label: '服务项名称',
    prop: 'serviceName'
  },
  {
    label: '调度线',
    prop: 'dispatchLineName'
  },
  {
    label: '计划开工时间',
    prop: 'pannedStartTime'
  },
])
export const stepList = reactive([
  { value: '10', label: '待接单' },
  { value: '20', label: '待开工' },
  // { value: '30', label: '已拒绝' },
  { value: '40', label: '实施中' },
  { value: '50', label: '完工待审核' },
  { value: '60', label: '已完结' },
])
export const getSequenceByBusiStatus = (busiStatus: string) => {
  switch (busiStatus) {
    case '20': return '1'
    case '40': return '2'
    case '50': return '3'
    default: return '-1'
  }
}
export const getBusiStatusBySequence = (sequence: string) => {
  switch (sequence) {
    case '1': return '20'
    case '2': return '40'
    case '3': return '50'
    default: return '-1'
  }
}