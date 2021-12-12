import { App } from 'vue'

import Container, { SIDEBAR_STYLE_KEY } from '@/components/container'
import SettingPanel from '@/components/setting-panel'


// 所有组件列表
const components = [ Container, SettingPanel ]

// 定义 install 方法， App 作为参数
const install = (app: App) => {
  // 遍历注册所有组件
  components.map((component) => {
    console.log(component.name)
    app.component(component.name, component)
  })
}

export {
  SIDEBAR_STYLE_KEY,
  Container,
  SettingPanel
}

export default {
  install
}
