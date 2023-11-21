interface DefaultPaginationData {
  total: number
  current: number
  pageSize: number
  showSizeChanger: boolean
  showQuickJumper: boolean
  pageSizeOptions: string[]
  showTotal: Function
}

interface PaginationData {
  total?: number
  current?: number
  pageSize?: number
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  pageSizeOptions?: string[]
  showTotal?: Function
}

/** 默认的分页参数 */
const defaultPaginationData: DefaultPaginationData = {
  total: 0,
  current: 1,
  pageSize: 10,
  showSizeChanger: true,
  showQuickJumper: true,
  pageSizeOptions: ['5', '10'],
  showTotal: (total: number, _range: Array<number>) => `共${total}条记录`
}

export function usePagination(initialPaginationData: PaginationData = {}) {
  /** 合并分页参数 */
  const paginationData = reactive({ ...defaultPaginationData, ...initialPaginationData })
  paginationData.showTotal = (total: number) => `共${total}条记录 第${paginationData.current}/${Math.ceil(total / paginationData.pageSize)}页`
  return { paginationData }
}
