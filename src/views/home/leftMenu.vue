<template>
  <div class="menu_wrap">
    <a-menu :items="menuList" :inline-collapsed="sidebar.collapse" theme="dark" mode="inline" :selectedKeys="onRoutes"
      :openKeys="openKeys" @select="onSelect"></a-menu>
  </div>
</template>

<script setup lang="ts">
import { useSidebarStore } from '@/store/sidebar'
import { useRoute, useRouter } from 'vue-router'
import menuList from './menuData'

const route = useRoute()
const router = useRouter()
const onRoutes = computed(() => { return [route.path] })

const sidebar = useSidebarStore()
const onSelect = ({ key }: { key: string }) => {
  router.push(key)
}
onMounted(() => {
  for (let i = 0; i < menuList.length; i++) {
    const element = menuList[i]
    for (let j = 0; j < element.children.length; j++) {
      const item = element.children[j]
      if (item.key == route.path) {
        openKeys.value = [element.key]
        return
      }
    }
  }
})
const openKeys = ref<string[]>([]) 
</script>

<style scoped>
.menu_wrap {
  height: calc(100vh - 70px);
}

.ant-menu {
  height: 100%;
  overflow-y: auto;
}

.ant-menu::-webkit-scrollbar {
  width: 0;
}

.ant-menu:not(.ant-menu-inline-collapsed) {
  width: 200px;
}
</style>