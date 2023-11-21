import service from '@/utils/service'

export const placeTreeApi = () => {
  return service("/work-place/placeTree", "post")
}

export const uploadApi = (data: object) => {
  return service("/file/upload", "post", data)
}