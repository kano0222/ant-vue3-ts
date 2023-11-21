<template>
  <a-tabs :activeKey="route.fullPath" hide-add type="editable-card" @edit="removeTab" @change="tabChange">
    <a-tab-pane v-for="item in tabs.list" :tab="item.label" :key="item.fullPath"></a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
import { useTabsStore } from '@/store/tabs'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const tabs = useTabsStore()
const tabChange = ((activeKey: string) => {
  router.push(activeKey)
})
const removeTab = (targetKey: string) => {
  let nextIndex = tabs.removeTab(targetKey)
  if (route.fullPath == targetKey) {
    let path = '/'
    if (nextIndex >= 0) { path = tabs.list[nextIndex].fullPath }
    router.push(path)
  }
}
const addTab = (getRoute: any) => {
  tabs.addTab({
    fullPath: getRoute.fullPath,
    label: getRoute.meta.title,
    name: getRoute.name
  })
}
addTab(route)

onBeforeRouteUpdate(to => { addTab(to) })
</script>

<style lang="scss" scoped></style>
