import { type RouteRecordRaw, createRouter, createWebHistory } from "vue-router"

/** 常驻路由 */
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/home',
    component: () => import('@/views/home/home.vue'),
    children: [
      {
        path: '/taskList',
        name: 'taskList',
        component: () => import('@/views/taskList/taskList.vue'),
        meta: { title: '任务单列表' },
      },
      {
        path: '/taskList1',
        name: 'taskList1',
        component: () => import('@/views/taskList/taskList copy.vue'),
        meta: { title: '任务单列表1' },
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, _from, next) => {
  if (to.path === '/login' || to.path == '/404' || import.meta.env.MODE == 'development') {
    next()
  } else {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

export default router
