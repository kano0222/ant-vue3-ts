import { defineStore } from 'pinia'

interface ListItem {
  fullPath: string //路由
  name: string //用于keep-alive
  label: string //tab显示的标题
}

export const useTabsStore = defineStore('tags', () => {
  const list = ref<ListItem[]>([])
  const nameList = computed(() => { return list.value.map(item => item.name) })

  const addTab = (item: ListItem) => {
    const isExist = nameList.value.includes(item.name)
    if (!isExist && item.label) {
      list.value.push(item)
    }
  }
  const removeTab = (fullPath: string): number => {
    let next = -1
    for (let index = 0; index < list.value.length; index++) {
      const element = list.value[index]
      if (element.fullPath == fullPath) {
        list.value.splice(index, 1)
        if (list.value.length != 0) {//获取最近打开的页面
          if (index == 0) {
            next = 0
          } else {
            next = index - 1
          }
        }
        break
      }
    }
    return next
  }
  return { list, nameList, addTab, removeTab }
})