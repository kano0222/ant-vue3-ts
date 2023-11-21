<template>
  <mainHeader />
  <div class="flex">
    <leftMenu />
    <div class="content_box flex_1">
      <tabs />
      <div class="content flex_1" :class="{ 'content_collapse': useSidebarStore().collapse }">
        <router-view v-slot="{ Component }">
          <transition name="move" mode="out-in">
            <keep-alive :include="useTabsStore().nameList">
              <component :is="Component"></component>
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useTabsStore } from '@/store/tabs'
import { useSidebarStore } from '@/store/sidebar'
import leftMenu from './leftMenu.vue'
import mainHeader from './mainHeader.vue'
import tabs from './tabs.vue'

</script>
<style scoped>
.content_box {
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
}

.content {
  width: calc(100vw - 200px);
  overflow: auto;
  transition-duration: 0.3s;
}

.content_collapse {
  width: calc(100vw - 64px);
}
</style>