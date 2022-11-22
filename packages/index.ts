import { App } from 'vue'

import Container, { SIDEBAR_STYLE_KEY } from '@/components/container'
import SettingPanel from '@/components/setting-panel'
import SvgIcon from '@/components/svg-icon'

// 所有组件列表
const components = [Container, SettingPanel, SvgIcon]

// 定义 install 方法， App 作为参数
const install = (app: App) => {
  // 遍历注册所有组件
  components.forEach((component) => {
    app.component(component.name, component)
  })
}

export { SIDEBAR_STYLE_KEY, Container, SettingPanel, SvgIcon }

export default {
  install
}
