import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', () => {
  const collapse = ref(false)
  const handleCollapse = () => {
    collapse.value = !collapse.value
  }
  return { collapse, handleCollapse }
})
