<template>
  <el-card>
    <div class="subtitle mb_20">作业信息</div>
    <div>
        <div class="flex add pointer fs-16" @click="add" >添加新纪录</div>
        <div class="text fs-12" v-for="(item,index) in common.list" :key="index">
            <div class="top flex fs-12 textCenter">
              
                <ul class="first">
                    <li class="title">编号记录</li>
                    <li>{{item.id}}</li>
                </ul>
                <ul >
                    <li class="title">记录类型</li>
                    <li>{{item.kindName}}</li>
                </ul>
            
             
                <ul class="first">
                    <li class="title">上传人</li>
                    <li>{{item.creatorName}}</li>
                </ul>
                <ul>
                    <li class="title">上传时间</li>
                    <li>{{item.createTime}}</li>
                </ul>
                <ul>
                    <li class="title">操作</li>
                    <li class="pointer" style="color: #108de9;" @click="detail(item)">详情</li>
                </ul>
            </div>
            <!-- <div class="bottom">
                <div class="top flex">
                    <div class="left">概要内容:************</div>
                    <div class="right">
                        <span style="margin-right:10px">上传人：张三</span>
                        <span>上传时间：2023-01-06</span>
                    </div>
                </div>
                <div class="botton flex">
                    <div class="flex" style="margin-bottom:15px">
                        <div>附件：</div>
                       <div style="flex: 1;">
                        <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="" v-for="(items,indexs) in common.imgList">
                       </div>
                    </div>
                    <div>
                        <span>备注：****************</span>
                    </div>
                </div>
            </div> -->
        </div>
        <el-dialog
    v-model="common.dialogVisible"
    title="添加新纪录"
    width="600px"
    @close="close"

  >
  <el-tree :data="common.data" :props="common.defaultProps" @node-click="handleNodeClick" default-expand-all/>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="common.dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import {reactive,watch} from 'vue'
import {workList,getTreeWork,openUrl} from '../../../../api/index'


const props = withDefaults(
    defineProps<{
      taskId:string,
    }>(),
    {
      taskId:'',

    }
)
interface obj{
    createTime:string ,
    creatorName:string,
    jumpUrl:string
    [key:string]:any

}

const common = reactive ({
  list:[] as Array<obj>,
   
   dialogVisible:false,
   data:[],
   url:'',
   defaultProps:{
       label:'kindName',
       children:'children'
   }
})
const openUrlAxios = async (kindId:string) => {
    let res = await openUrl({taskId:props.taskId,kindId})

    common.url = res.data
}
const close = () => {
  common.url = ''
}
const submit = () => {
  if(!common.url) {
    ElMessage.warning('请选择一项')
    return
  }
  workListAxios()
    window.open(common.url)
    common.dialogVisible = false
}
const handleNodeClick = (val:any) => {
    console.log(val)
    openUrlAxios(val.kindId)
}
const add = () => {
    common.dialogVisible = true
    getTreeWorkAxios()
}
const getTreeWorkAxios = async () => {
    let res = await getTreeWork()
    common.data = res.data
}
const detail = (item:{jumpUrl:string}) => {
    // console.log(item)
    window.open(item.jumpUrl)
}
// 获取列表
const workListAxios = async () => {
    let res = await workList({taskId:props.taskId})
   
    common.list = res.data
}
watch(() => props.taskId,() => {
  workListAxios()
},{immediate:true})
</script>
<style lang="scss" scoped>
.text {
 
 color: #333;
 border-bottom: 1px solid  rgba(242,242,242,1);
 padding: 15px 0;
 &:last-child {
     border-bottom: none;
 }
}
.top {
 justify-content: space-between;

}
.title {
 color: #555;
 margin-bottom: 20px;
}
ul {
 li {
     color: #333;
 }

}
.first {
     margin-right: 25px;
 }
 .add {
     justify-content: flex-end;
     margin-bottom: 15px;
     color: #F06F1E;
 }</style>
