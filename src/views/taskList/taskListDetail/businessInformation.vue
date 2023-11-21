<template>
  <a-card class="mt_10">
    <template v-for="item in allList">
      <div class="subtitle mb_10 cyan">{{ item.title }}</div>
      <div class="gridForm">
        <div class="flex" v-for="it in item.list">
          <div class="label">{{ it.label }}：</div>
          <div class="value pictureCard" v-if="it.prop == 'attachment'">
            <template v-if="entrustOrderDetailData_attachment.length == 0">-</template>
            <img v-for="url in entrustOrderDetailData_attachment" :src="url" alt=""
              @click="taskListDetailStore.handlePictureCardPreview(url)">
          </div>
          <div class="value" v-else-if="it.prop == 'needSalemanConfirm'">{{ entrustOrderDetailData[it.prop] ? '是' : '否' }}
          </div>
          <div class="value" v-else>{{ entrustOrderDetailData[it.prop] || '-' }}</div>
        </div>
      </div>
    </template>
  </a-card>
</template>

<script setup lang="ts">
import { useTaskListDetailStore } from './taskListDetailStore'
const taskListDetailStore = useTaskListDetailStore()
const entrustOrderDetailData = computed(() => {
  return taskListDetailStore.entrustOrderDetailData
})
const entrustOrderDetailData_attachment = computed(() => {
  if (entrustOrderDetailData.value.attachment) {
    return entrustOrderDetailData.value.attachment.split(',')
  }
  return []
})
const allList = reactive([
  {
    title: '委托信息',
    list: [{
      label: '集团委托单编号',
      prop: 'entrustOrderCcicId'
    },
    {
      label: '委托单名称',
      prop: 'entrustOrderName'
    },
    {
      label: '委托时间',
      prop: 'createTime'
    },
    {
      label: '产品线',
      prop: 'productLineName'
    },
    {
      label: '备注',
      prop: 'remark'
    },
    {
      label: '附件',
      prop: 'attachment'
    }
    ]
  },
  {
    title: '报验信息',
    list: [{
      label: '报验人',
      prop: 'inspectionApplicant'
    },
    {
      label: '联系人',
      prop: 'inspectionName'
    },
    {
      label: '联系电话',
      prop: 'inspectionTel'
    }]
  },
  {
    title: '客户信息',
    list: [{
      label: '客户名称',
      prop: 'customer'
    },
    {
      label: '联系人',
      prop: 'customName'
    },
    {
      label: '联系电话',
      prop: 'customTel'
    }]
  },
  {
    title: '销售员信息',
    list:
      [{
        label: '销售员姓名',
        prop: 'salespersonRealname'
      },
      {
        label: '联系电话',
        prop: 'salespersonTel'
      },
      {
        label: '是否需要销售确认',
        prop: 'needSalemanConfirm'
      }]
  },
  {
    title: '销售员信息',
    list: [{
      label: '货物名称',
      prop: 'goodsName'
    },
    {
      label: '货物品类',
      prop: 'goodsType'
    }]
  },
  {
    title: '销售员信息',
    list:
      [{
        label: '储运方式',
        prop: 'storageTransportType'
      },
      {
        label: '船名',
        prop: 'shipNameChinese'
      },
      {
        label: '卸货港',
        prop: 'dischargePort'
      },
      {
        label: '工作场所',
        prop: 'workPlaceName'
      },
      {
        label: '联系人',
        prop: 'transportationTontact'
      },
      {
        label: '联系方式',
        prop: 'transportationContactTel'
      }]
  }]
)
</script>

<style lang='scss' scoped>
.gridForm {
  display: grid;
  grid-template-columns: repeat(3, 33.3%);
  gap: 15px 10px;
  padding-left: 10px;
  padding-bottom: 20px;
}
</style>