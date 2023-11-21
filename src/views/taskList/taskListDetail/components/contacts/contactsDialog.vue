<script lang="ts" setup>
const dialogVisible = ref<boolean>(false)
const contacts = ref([{ specificationName: '', description: '' }])
const index = ref(0)
const showDialog = (getData: any) => {
  contacts.value = getData
  dialogVisible.value = true
}
const resetData = () => {
  contacts.value = [{ specificationName: '', description: '' }]
  index.value = 0
}
const nextAction = () => {
  if (contacts.value?.length == index.value + 1) {
    dialogVisible.value = false
  } else {
    index.value++
  }
}
defineExpose({ showDialog })
</script>

<template>
  <el-dialog :close-on-click-modal="false" v-model="dialogVisible" :title="contacts[index].specificationName"
    @close="resetData" width="500">
    <div style="line-height: 1.7;font-size: 1.1em;" v-html="contacts[index].description"></div>
    <template #footer>
      <div class="flex_center">
        <el-button type="primary" @click="nextAction">我已知晓</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
