<template>
  <div class="app_container" style="background-color: #fff;">
    <div class="fs_24">手机快捷登录</div>
    <div class="form">
      <div class="flex">
        <input class="flex_1" type="text" v-model="formData.mobile" placeholder="请输入手机号">
        <div v-show="time <= 0" class="code" @click="getCode">获取验证码</div>
        <div v-show="time > 0" class="code">已发送{{ time }}s</div>
      </div>
      <div>
        <input type="text" v-model="formData.validateCode" placeholder="请输入验证码">
      </div>
    </div>
    <a-button round type="primary" size="large" @click="login">登录</a-button>
  </div>
</template>

<script setup lang="ts">
import { isPhoneNumber } from '@/utils/validate'
import { message } from 'ant-design-vue'
const [messageApi] = message.useMessage()
// import { useRouter } from 'vue-router'
// const router = useRouter()
const formData = reactive({ mobile: '', validateCode: '' })
const time = ref(0)
let timer: NodeJS.Timeout
const getCode = () => {
  if (!formData.mobile || !isPhoneNumber(formData.mobile)) {
    message.error('请填写正确的手机号')
    return
  }
  time.value = 60
  timer = setInterval(() => {
    if (time.value <= 0) {
      clearInterval(timer)
    }
    time.value--
  }, 1000)
  // sendApi({ mobile: formData.mobile }).then(res => {
  //   if (res.data) {
  //     message.success('发送成功')
  //   }
  // })
}
const login = () => {
  messageApi.error('请填写正确的手机号')
  console.log(messageApi)

  if (!formData.mobile || !isPhoneNumber(formData.mobile)) {
    messageApi.error('请填写正确的手机号')
    return
  }
  if (!formData.validateCode) {
    message.error('请填写验证码')
    return
  }
  // loginApi(formData).then(res => {
  //   if (res.data) {
  //     localStorage.setItem("token", res.data.authToken)
  //     localStorage.setItem("memberId", res.data.memberId)
  //     localStorage.setItem("headUrl", res.data.headUrl)
  //     localStorage.setItem("realName", res.data.realName)
  //     router.push("/")
  //   }
  // })


}
</script>

<style lang="scss" scoped>
.app_container {
  padding: calc(80 / 375 * 100vw) calc(24 / 375 * 100vw);
}

.form {
  padding: calc(50 / 375 * 100vw) 0;

  >div {
    padding: calc(16 / 375 * 100vw) 0;
    border-bottom: calc(1 / 375 * 100vw) solid rgba(229, 229, 229, 1);
    margin-top: calc(16 / 375 * 100vw)
  }

  .code {
    color: rgba(166, 166, 166, 1);
  }

  input {
    font-size: calc(16 / 375 * 100vw);
  }

  input::placeholder {
    color: rgba(229, 229, 229, 1);
  }
}
</style>