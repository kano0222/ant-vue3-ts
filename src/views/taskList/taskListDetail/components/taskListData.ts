export const taskList = reactive([
  {
    label: '任务单编号',
    prop: 'taskCode'
  },
  {
    label: '任务单名称',
    prop: 'taskName'
  },
  {
    label: '作业要求',
    prop: 'workRequire'
  },
  {
    label: '计划开工时间',
    prop: 'pannedStartTime'
  },
  {
    label: '备注',
    prop: 'remark'
  }
])
const carList1 = reactive([
  {
    label: '车辆类型',
    prop: 'type',
    formatter: (type: string) => {
      switch (Number(type)) {
        case 1: return '5座小汽车'
        case 2: return '7座货车'
        case 3: return '5座皮卡车'
        default: return type || '-'
      }
    }
  },
  {
    label: '当前位置',
    prop: 'carLacation',
  },
  {
    label: '工具包',
    prop: 'toolkitList',
    formatter: (toolkitList: Array<any>) => {
      if (toolkitList?.length && toolkitList.length != 0) {
        return `(${toolkitList.length})` + toolkitList.map(item => item.name).join(',')
      }
      return '-'
    }
  },
  {
    label: '通行范围',
    prop: 'carPassList',
    formatter: (carPassList: Array<any>) => {
      if (carPassList?.length && carPassList.length != 0) {
        return `(${carPassList.length})` + carPassList.map(item => item.placeName).join(',')
      }
      return '-'
    }
  }
])
const carList2 = reactive([
  {
    label: '预估距离',
    prop: 'distance',
    formatter: (distance: string) => {
      return distance + 'KM'
    }
  },
  {
    label: '预估交通费',
    prop: 'trafficFree',
    formatter: (trafficFree: string) => { return trafficFree + '元' }
  },
  {
    label: '工具包',
    prop: 'toolkitList',
    formatter: (toolkitList: Array<any>) => {
      if (toolkitList?.length && toolkitList.length != 0) {
        return `(${toolkitList.length})` + toolkitList.map(item => item.name).join(',')
      }
      return '-'
    }
  },
  {
    label: '备注',
    prop: 'privateCarRemark'
  }
])
export const getValue = (item: any, form: any) => {
  if (item.formatter) {
    return item.formatter(form[item.prop])
  }
  return form[item.prop] || '-'
}
export const getCarType = (carType: string) => {
  switch (carType) {
    case '1': return '公车'
    case '2': return '私车'
    case '0': return '重新指派不派车'
    default: return carType
  }
}
export const getCarList = (carType: string) => {
  switch (carType) {
    case '1': return carList1
    case '2': return carList2
    case '0': return []
    default: return []
  }
}
export const getSequence = (sequence: string) => {
  switch (sequence) {
    case '1': return '开工前'
    case '2': return '实施中'
    case '3': return '完工后'
    default: return sequence
  }
}