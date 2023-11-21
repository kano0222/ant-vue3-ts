<script lang="ts" setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
//时间选择器本地化
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

</script>

<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>
