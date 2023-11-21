import {
  PieChartOutlined,
  // MenuFoldOutlined,
  // MenuUnfoldOutlined,
  // MailOutlined,
  // DesktopOutlined,
  // InboxOutlined,
  // AppstoreOutlined,
} from '@ant-design/icons-vue'

export default [
  {
    icon: () => h(PieChartOutlined),
    label: '实施管理',
    key: '1',
    children: [
      {
        label: '任务单列表',
        key: '/taskList'
      },
      {
        label: '任务单列表1',
        key: '/taskList1'
      }
    ],
  },
  {
    icon: () => h(PieChartOutlined),
    label: '实施管理',
    key: '2',
    children: [
      {
        label: '任务单列表',
        key: '/taskList123'
      },
      {
        label: '任务单列表1',
        key: '/taskList11234'
      }
    ],
  },
] 