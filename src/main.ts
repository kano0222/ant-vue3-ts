import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/common.scss'
import router from "@/router"
import { createPinia } from 'pinia'
// import * as Icons from '@ant-design/icons-vue'

const app = createApp(App)

// for (const [key, component] of Object.entries(Icons)) {
//   app.component(key, component)
// }
app.use(createPinia())
app.use(router)

router.isReady().then(() => {
  app.mount("#app")
})

