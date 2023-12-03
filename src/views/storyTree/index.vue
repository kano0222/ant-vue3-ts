<template>
  <div class="app-container">
    <el-card class="leftCard" shadow="never">
      <el-tree
        :data="treeData"
        draggable
        :current-node-key="currentNodeKey"
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
        :highlight-current="true"
        @current-change="nodeChange"
      >
      </el-tree>
    </el-card>
    <el-card class="rightCard" shadow="never" v-loading="loading">
      {{ currentNodeKey }}
      <div>
        {{ treeData }}
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import type Node from 'element-plus/es/components/tree/src/model/node'
import type { AllowDropType, NodeDropType } from 'element-plus/es/components/tree/src/tree.type'
interface Tree {
  label: string
  children?: Tree[]
}
const loading = ref<boolean>(false)
const treeData = ref<Tree[]>([
  {
    label: '主线1',
    children: [
      {
        label: 'Vol.3',
        children: [
          {
            label: '第一章',
            children: [
              { label: '1' },
              { label: '2' },
              { label: '3' },
              { label: '4' },
              { label: '5' },
              { label: '6' }
            ]
          }
        ]
      }
    ]
  },
  {
    label: '主线2',
    children: [
      {
        label: 'Vol.3',
        children: [
          {
            label: '第一章',
            children: [
              { label: '1' },
              { label: '2' },
              { label: '3' },
              { label: '4' },
              { label: '5' },
              { label: '6' }
            ]
          }
        ]
      }
    ]
  }
])
const allowDrop = (draggingNode: Node, dropNode: Node, type: AllowDropType) => {
  console.log(draggingNode)
  console.log(dropNode)
  console.log(type)

  if (dropNode.data.label === 'Level two 3-1') {
    return type !== 'inner'
  } else {
    return true
  }
}
const allowDrag = (draggingNode: Node) => {
  return !draggingNode.data.label.includes('主线')
}

const mouseenter = data => {
  data.show = true
}
const mouseleave = data => {
  data.show = false
}

const currentNodeKey = ref<string>('')
const nodeChange = (data: Tree, node: Node) => {
  console.log(node)
  console.log(data)

  currentNodeKey.value = node.label
}
</script>
<style lang="scss" scoped>
.app-container {
  display: flex;

  > div {
    flex: 1;
  }
}
</style>
