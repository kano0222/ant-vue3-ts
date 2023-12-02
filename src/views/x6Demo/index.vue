<template>
  <div style="width: 100%; height: 100%;">
    <div ref="container"></div>
  </div>
</template>

<script setup lang="ts">
import { Graph } from '@antv/x6'
const container = ref<HTMLElement>()
onMounted(() => {
  const graph = new Graph({
    container: container.value,
    autoResize: true,
    background: {
      color: '#E5E6EB',
    },
    interacting: false,//用户交互
    panning: true,//平移
    mousewheel: true,//缩放
  })
  graph.addNode({
    shape: 'polygon',
    x: 40,
    y: 40,
    width: 80,
    height: 80,
    label: 'polygon',
    attrs: {
      body: {
        fill: '#efdbff',
        stroke: '#9254de',
        // 指定 refPoints 属性，多边形顶点随图形大小自动缩放
        // https://x6.antv.vision/zh/docs/api/registry/attr#refpointsresetoffset
        refPoints: '0,10 10,0 20,10 10,20',
      },
    },
  })
})

</script>