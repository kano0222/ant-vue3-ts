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
    label: 'demo',
    key: '1',
    children: [
      {
        label: '列表',
        key: '/taskList'
      },
      {
        label: 'x6Demo',
        key: '/x6Demo'
      },
      {
        label: 'storyTree',
        key: '/storyTree'
      },
    ],
  }
] 