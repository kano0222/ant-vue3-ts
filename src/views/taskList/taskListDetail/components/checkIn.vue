<template>
  <el-card style="width: calc(50% - 5px);">
    <div class="subtitle mb_20">打卡记录</div>
    <div v-if="beforeEnd" class="mb_20 fs_14">开工时间：{{ startTime }}</div>
    <div class="flex_center" :class="{ 'disable': !isAble, 'start': beforeStart, 'end': beforeEnd }">
      <div class="outer cycle" @click="onCheckIn">
        <div class="cycle">
          <div class="cycle flex_center">
            <div class="inner">
              <div class="mb_20" style="font-size: 2.2vw;">{{ beforeStart ? '开工打卡' : '任务完工' }}</div>
              <div class="time">{{ time }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex_column mt_10" style="line-height: 1.6;font-size: 0.8em;">
      <div>当前位置：{{ location.position || '-' }}</div>
      <div>经度:{{ location.lng || '-' }}，纬度:{{ location.lat || '-' }}</div>
    </div>
    <div></div>
  </el-card>
</template>

<script setup lang="ts">
import dayjs from "dayjs"
import { checkInApi } from '@/api/implementation/taskListDetail'
import AMapLoader from '@amap/amap-jsapi-loader'
// window['_AMapSecurityConfig'] = {
//   securityJsCode: 'f90363226107aef25fbb47e1c258930b'//在这里填写你的安全密钥
// }

import { useTaskListDetailStore } from '../taskListDetailStore'
const taskListDetailStore = useTaskListDetailStore()
const taskListDetailData = computed(() => { return taskListDetailStore.taskListDetailData })
const busiStatus = computed(() => { return taskListDetailData.value.busiStatus })
const beforeStart = computed(() => { return busiStatus.value == '20' })
const beforeEnd = computed(() => { return busiStatus.value == '50' })
const clockInformations = computed(() => { return taskListDetailData.value.clockInformations || [] })
const startTime = computed(() => {
  let find = clockInformations.value.find((item: any) => item.clockType == '4')
  if (find) { return find.createTime }
  return ''
})
import { getSequenceByBusiStatus } from '../taskListDetail'
const contacts = computed(() => {
  return taskListDetailStore.contacts.filter((item: any) =>
    item.sequence == getSequenceByBusiStatus(busiStatus.value) && item.action != '1' && item.required)
})

const isAble = computed(() => {
  return contacts.value.every((item: any) => item.attachment && item.attachment.length != 0)
})


const location = ref({ lat: '', lng: '', position: '' })
onMounted(() => {
  AMapLoader.load({
    key: "fae3c4f66960d21fc4551e561d82442c", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.Geolocation'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  }).then((AMap) => {
    let geolocation = new AMap.Geolocation({})
    geolocation.getCurrentPosition((status: string, result: any) => {
      if (status === 'complete') {
        let { lat, lng } = result.position
        Object.assign(location.value, { lat, lng })
      }
      // if (status === 'complete' && result.info === 'OK') {
      // console.log(result)
      //   console.log(status)
      // }
    })
  })
})
const onCheckIn = () => {
  if (isAble.value) {
    if (taskListDetailStore.autoSave) {
      taskListDetailStore.uploadSpecificationImmediately()
    } else {
      checkInApi({
        taskId: taskListDetailData.value.taskId, ...location.value,
        clockType: busiStatus.value == '20' ? 4 : 5,
        createTime: time.value
      }).then((res) => {
        if (res.data) { ElMessage.success('打卡成功') }
        taskListDetailStore.getDetail()
      })
    }
  }
}
const time = ref(dayjs().format("YYYY-MM-DD HH:mm:ss"))
const timer = setInterval(() => { time.value = dayjs().format("YYYY-MM-DD HH:mm:ss") }, 1000)
onUnmounted(() => { clearInterval(timer) })
</script>
<style lang="scss" scoped>
.cycle {
  padding: calc(1 / 80 *100vw);
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.outer {
  cursor: pointer;
  width: calc(3 / 16 *100vw);
  height: calc(3 / 16 *100vw);
}

.disable .outer {
  cursor: not-allowed;
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
}

.start .outer {
  background-color: rgba(245, 154, 35, 0.5);

  >.cycle {
    background-color: rgba(245, 154, 35, 0.5);

    >.cycle {
      background-color: rgba(245, 154, 35, 1);
    }
  }
}

.end .outer {
  background-color: rgba(95, 241, 154, 0.4);

  >.cycle {
    background-color: rgba(95, 241, 154, 0.5);

    >.cycle {
      background-color: rgba(95, 241, 154, 1)
    }
  }
}


.inner {
  text-align: center;
  color: #fff;
}
</style>