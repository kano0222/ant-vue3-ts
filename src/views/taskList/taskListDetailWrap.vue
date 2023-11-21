<template>
  <a-card :loading="taskListDetailStore.loading" size="small">
    <a-card size="small">
      <a-tabs class="mt_20" v-model:activeKey='activeIndex' type="card">
        <a-tab-pane v-for="(label, index) in ['业务信息', '任务单', '操作记录']" :tab="label" :key="index"></a-tab-pane>
      </a-tabs>
      <a-button type="primary" size="large" :icon="h(LeftOutlined)" color="#626aef" :dark="true"
        @click="backList">返回</a-button>
      <div class="statistic flex mt_20">
        <div v-for="item in statisticList" class="flex_column flex_1">
          <div class="label">{{ item.label }}</div>
          <div class="value">{{ taskListDetailData[item.prop] || '-' }}</div>
        </div>
      </div>
      <template v-if="activeIndex == 1">
        <div class="status flex_between">
          <div class="step flex select_none">
            <div :class="{ 'active': busiStatus == item.value }" v-for="item in stepList" class="flex_center flex_1">
              {{ item.label }} </div>
          </div>
          <div class='refuse flex_center select_none' :class="{ 'active': busiStatus == '30' }">已拒绝</div>
        </div>
        <div class="ml_20 fs_16" v-if="taskListDetailData.shipName" style="font-weight: bold;">
          {{ taskListDetailData.shipName }} 预计靠泊时间
          <span class="cyan ">{{ taskListDetailData.expectBerthingTime }}</span> 船讯网预靠时间
          <span class="cyan">{{ taskListDetailData.shipInfoBerthingTime }}</span> 到达
          {{ taskListDetailData.planPlaceName }}
        </div>
      </template>
    </a-card>
    <BusinessInformation v-if="activeIndex == 0" />
    <task-list-detail v-else-if="activeIndex == 1"></task-list-detail>
    <operate-log v-else-if="activeIndex == 2" />
    <a-modal :z-index='3000' :open="dialogControl.previewVisible">
      <img style="width: 100%;" :src="dialogControl.dialogImageUrl" alt="Preview Image" />
    </a-modal>
  </a-card>
</template>

<script setup lang="ts">
const activeIndex = ref(0)
import { h } from 'vue'
import { LeftOutlined } from '@ant-design/icons-vue'
import BusinessInformation from './taskListDetail/businessInformation.vue'
import taskListDetail from './taskListDetail/taskListDetail.vue'
import operateLog from './taskListDetail/operateLog.vue'
import { statisticList, stepList } from './taskListDetail/taskListDetail'
import { useTaskListDetailStore } from './taskListDetail/taskListDetailStore'
const taskListDetailStore = useTaskListDetailStore()
const taskListDetailData = computed(() => { return taskListDetailStore.taskListDetailData })
const busiStatus = computed(() => { return taskListDetailData.value.busiStatus })
const backList = () => {
  taskListDetailStore.changeShowDetail()
  activeIndex.value = 0
}
const dialogControl = computed(() => { return taskListDetailStore.dialogControl })
</script>

<style lang="scss" scoped>
.statistic {
  >div {
    gap: 10px;
    white-space: nowrap;
    padding: 0 10px;

    .label {
      color: #aaa;
    }
  }

  >div+div {
    border-left: #aaa solid 1px;
  }
}

.status {
  padding: 20px 40px;
  color: #aaa;
  gap: 25px;

  .step {
    gap: 25px;

    >div {
      height: 40px;
      min-width: 130px;
      background-color: #F2F2F2;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: -19px;
        border-left: 20px solid transparent;
        border-top: 20px solid #F2F2F2;
        border-bottom: 20px solid #F2F2F2;
      }

      &::after {
        content: '';
        position: absolute;
        right: -19px;
        border-left: 20px solid #F2F2F2;
        border-top: 20px solid transparent;
        border-bottom: 20px solid transparent;
      }

      &:first-of-type {
        border-radius: 20px 0 0 20px
      }

      &:first-of-type::before {
        display: none;
      }

      &:last-of-type {
        border-radius: 0 20px 20px 0
      }

      &:last-of-type::after {
        display: none;
      }
    }

    .active {
      background-color: #02A7F0;
      color: #fff;

      &::before {
        border-top: 20px solid #02A7F0;
        border-bottom: 20px solid #02A7F0;
      }

      &::after {
        border-left: 20px solid #02A7F0;
      }
    }
  }

  .refuse {
    height: 40px;
    background-color: #F2F2F2;
    min-width: 130px;
    border-radius: 20px
  }

  .active {
    background-color: #E75E6F;
    color: #fff;
  }
}
</style>