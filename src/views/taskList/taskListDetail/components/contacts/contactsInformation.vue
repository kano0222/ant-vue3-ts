<template>
  <contact-item v-for="item in contacts" :contactData="item"></contact-item>
</template>

<script setup lang="ts">
import contactItem from './contactItem.vue'
const props = defineProps({
  sequence: {
    type: String,
    default: '1'
  }
})
import { useTaskListDetailStore } from '../../taskListDetailStore'
const taskListDetailStore = useTaskListDetailStore()
const contacts = computed(() => {
  return taskListDetailStore.contacts.filter((item: any) =>
    item.sequence == props.sequence && item.action != '1')
})
</script>