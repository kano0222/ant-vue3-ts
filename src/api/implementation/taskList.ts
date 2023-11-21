import service from '@/utils/service'
//分页列表
export function pageApi(data: object) {
  return service("/api/pad/task/page", "post", data)
}
//状态统计
export function statApi() {
  return service("/api/pad/task/stat", "get")
}
//详情
export function detailApi(id: string) {
  return service(`/api/pad/task?id=${id}`, "get")
}
//服务详情
export function entrustOrderIdDetailApi(id: string) {
  return service(`/api/pad/task/entrustorderId?entrustorderId=${id}`, "get")
}
//操作记录
export function getOperateLog(data: object) {
  return service("/api/pad/task/getOperateLog", "post", data)
}
//接单
export function acceptApi(data: object) {
  return service("/api/pad/task/accept", "post", data)
}
//拒单
export function refuseApi(data: object) {
  return service("/api/pad/task/refuse", "post", data)
}