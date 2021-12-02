import { App } from 'vue'

import container from './container/index.vue'


// 所有组件列表
const components = [ container ]

// 定义 install 方法， App 作为参数
const install = (app: App) => {
  // 遍历注册所有组件
  components.map((component) => {
    console.log(component.name)
    app.component(component.name, component)
  })
}

export {
  container
}

export default {
  install
}
