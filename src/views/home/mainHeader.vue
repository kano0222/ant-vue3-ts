<template>
  <header class="flex_between">
    <div class="header_left  flex">
      <div class="title flex_center" @click="router.push('home')">调度系统</div>
      <div class="collapse-btn flex_center" @click="sidebar.handleCollapse">
        <MenuUnfoldOutlined v-if="sidebar.collapse" />
        <MenuFoldOutlined v-else />
      </div>
    </div>
    <div class="header_right flex">
      <a-avatar :size="30" :src="avatar" />
      <!-- 用户名下拉菜单 -->
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          {{ username }}
          <DownOutlined style="fontSize:14px;cursor: pointer;" />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a>修改密码</a>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item>
              <a @click="loginOut">退出登录</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </header>
</template>
<script setup lang="ts">
import { useSidebarStore } from '@/store/sidebar'
import { useRouter } from 'vue-router'
import avatar from '@/assets/img/avatar.jpg'


const sidebar = useSidebarStore()
const username = computed(() => { return localStorage.getItem('realname') || 'user' })
onMounted(() => {
  if (document.body.clientWidth < 1500) {
    // sidebar.collapse = true
  }
})

// 用户名下拉菜单选择事件
const router = useRouter()
const loginOut = () => {
  localStorage.clear()
  router.push('/login')
}
</script>
<style lang="scss" scoped>
header {
  height: 70px;
  background-color: #001529;
  color: #fff;

  .header_left {
    .title {
      width: 199px;
      cursor: pointer;
    }

    .collapse-btn {
      width: 64px;
      height: 100%;
      cursor: pointer;
    }
  }

  .header_right {
    padding-right: 50px;
    align-items: center;
    gap: 15px;

  }
}
</style>
